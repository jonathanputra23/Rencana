"use client"

import { Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Alex J.",
    "Web App": 40,
    "Mobile App": 30,
    API: 10,
    Other: 0,
  },
  {
    name: "Sarah M.",
    "Web App": 30,
    "Mobile App": 0,
    API: 0,
    Other: 40,
  },
  {
    name: "David C.",
    "Web App": 20,
    "Mobile App": 0,
    API: 60,
    Other: 0,
  },
  {
    name: "Emily R.",
    "Web App": 25,
    "Mobile App": 25,
    API: 20,
    Other: 0,
  },
  {
    name: "Michael W.",
    "Web App": 0,
    "Mobile App": 0,
    API: 0,
    Other: 70,
  },
  {
    name: "Jessica T.",
    "Web App": 30,
    "Mobile App": 20,
    API: 10,
    Other: 20,
  },
]

export function ResourceAllocationChart() {
  return (
    <ChartContainer
      className="h-[400px] w-full"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null
              return (
                <div className="p-2">
                  <div className="font-medium">{label}</div>
                  <div className="flex flex-col gap-1 mt-1">
                    {payload.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-muted-foreground">{entry.name}:</span>
                        <span className="font-medium">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }}
          />
        </ChartTooltip>
      }
    >
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 60,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={60} />
            <Bar dataKey="Web App" stackId="a" fill="#3b82f6" name="Web App" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Mobile App" stackId="a" fill="#10b981" name="Mobile App" radius={[0, 0, 0, 0]} />
            <Bar dataKey="API" stackId="a" fill="#f59e0b" name="API" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Other" stackId="a" fill="#6b7280" name="Other" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <ChartLegend
        className="mt-4 justify-center"
        items={[
          {
            name: "Web App",
            color: "#3b82f6",
          },
          {
            name: "Mobile App",
            color: "#10b981",
          },
          {
            name: "API",
            color: "#f59e0b",
          },
          {
            name: "Other",
            color: "#6b7280",
          },
        ]}
      />
    </ChartContainer>
  )
}
