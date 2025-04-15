"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { tooltip?: React.ReactNode }
>(({ className, children, tooltip }, ref) => {
  return (
    <div className={cn("relative", className)} ref={ref}>
      {children}
      {tooltip && <div className="absolute z-10 top-0 left-0 pointer-events-none">{tooltip}</div>}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div className={cn("w-full h-full", className)} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("absolute z-50", className)} ref={ref} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    content?: (props: any) => React.ReactNode
  }
>(({ className, content, ...props }, ref) => {
  return (
    <div
      className={cn("bg-popover text-popover-foreground rounded-md border p-2 shadow-md", className)}
      ref={ref}
      {...props}
    >
      {content ? content(props) : null}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    items?: { name: string; color: string }[]
  }
>(({ className, items, ...props }, ref) => {
  return (
    <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
      {items?.map((item) => (
        <div key={item.name} className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-sm text-muted-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend }
