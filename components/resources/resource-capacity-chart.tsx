"use client"

import { Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"

const data = [
  {
    month: "Jan",
    capacity: 100,
    allocated: 85,
  },
  {
    month: "Feb",
    capacity: 100,
    allocated: 90,
  },
  {
    month: "Mar",
    capacity: 100,
    allocated: 95,
  },
  {
    month: "Apr",
    capacity: 120,
    allocated: 105,
  },
  {
    month: "May",
    capacity: 120,
    allocated: 115,
  },
  {
    month: "Jun",
    capacity: 120,
    allocated: 125,
  },
  {
    month: "Jul",
    capacity: 140,
    allocated: 130,
  },
  {
    month: "Aug",
    capacity: 140,
    allocated: 135,
  },
  {
    month: "Sep",
    capacity: 140,
    allocated: 145,
  },
  {
    month: "Oct",
    capacity: 160,
    allocated: 150,
  },
  {
    month: "Nov",
    capacity: 160,
    allocated: 155,
  },
  {
    month: "Dec",
    capacity: 160,
    allocated: 165,
  },
]

export function ResourceCapacityChart() {
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
                        <span className="font-medium">{entry.value} person-days</span>
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
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ReferenceLine y={100} stroke="#ff0000" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="capacity" stroke="#3b82f6" name="Capacity" strokeWidth={2} />
            <Line type="monotone" dataKey="allocated" stroke="#f59e0b" name="Allocated" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Chart>
      <ChartLegend
        className="mt-4 justify-center"
        items={[
          {
            name: "Capacity",
            color: "#3b82f6",
          },
          {
            name: "Allocated",
            color: "#f59e0b",
          },
        ]}
      />
    </ChartContainer>
  )
}
