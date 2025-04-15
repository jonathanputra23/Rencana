"use client"
import { Chart, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Web App",
    completed: 45,
    inProgress: 30,
    backlog: 15,
  },
  {
    name: "Mobile App",
    completed: 30,
    inProgress: 40,
    backlog: 20,
  },
  {
    name: "API",
    completed: 60,
    inProgress: 25,
    backlog: 10,
  },
  {
    name: "Database",
    completed: 75,
    inProgress: 15,
    backlog: 5,
  },
  {
    name: "DevOps",
    completed: 50,
    inProgress: 35,
    backlog: 10,
  },
]

export function ProjectOverviewChart() {
  return (
    <ChartContainer
      className="h-[300px] w-full"
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
                        <span className="font-medium">{entry.value} tasks</span>
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
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" radius={[0, 0, 0, 0]} />
            <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" radius={[0, 0, 0, 0]} />
            <Bar dataKey="backlog" stackId="a" fill="#6b7280" name="Backlog" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Chart>
      <ChartLegend
        className="mt-4 justify-center"
        items={[
          {
            name: "Completed",
            color: "#10b981",
          },
          {
            name: "In Progress",
            color: "#3b82f6",
          },
          {
            name: "Backlog",
            color: "#6b7280",
          },
        ]}
      />
    </ChartContainer>
  )
}
