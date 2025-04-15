"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, AlertTriangle } from "lucide-react"

const upcomingTasks = [
  {
    id: 1,
    title: "Complete user authentication flow",
    project: "Web App",
    assignee: "Alex Johnson",
    dueDate: "Today",
    priority: "High",
    isOverdue: false,
  },
  {
    id: 2,
    title: "Fix mobile navigation bug",
    project: "Mobile App",
    assignee: "Emily Rodriguez",
    dueDate: "Tomorrow",
    priority: "Critical",
    isOverdue: false,
  },
  {
    id: 3,
    title: "Update API documentation",
    project: "API",
    assignee: "Sarah Miller",
    dueDate: "In 2 days",
    priority: "Medium",
    isOverdue: false,
  },
  {
    id: 4,
    title: "Implement database migration script",
    project: "Database",
    assignee: "David Chen",
    dueDate: "In 3 days",
    priority: "High",
    isOverdue: false,
  },
  {
    id: 5,
    title: "Review pull requests",
    project: "DevOps",
    assignee: "Michael Wong",
    dueDate: "In 5 days",
    priority: "Low",
    isOverdue: false,
  },
]

export function UpcomingDeadlines() {
  return (
    <div className="space-y-3">
      {upcomingTasks.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="font-medium">{task.title}</div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline">{task.project}</Badge>
                  <span className="text-muted-foreground">Assigned to {task.assignee}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant={
                    task.priority === "Critical"
                      ? "destructive"
                      : task.priority === "High"
                        ? "default"
                        : task.priority === "Medium"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {task.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs">
                  {task.isOverdue ? (
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                  ) : (
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className={task.isOverdue ? "text-red-500" : "text-muted-foreground"}>{task.dueDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
