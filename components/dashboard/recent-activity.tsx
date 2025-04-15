"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MessageSquare, PlusCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    action: "completed",
    task: "Update user authentication flow",
    project: "Web App",
    time: "10 minutes ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: 2,
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    action: "commented on",
    task: "API documentation update",
    project: "API",
    time: "25 minutes ago",
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DC",
    },
    action: "created",
    task: "Implement database migration script",
    project: "Database",
    time: "1 hour ago",
    icon: <PlusCircle className="h-4 w-4 text-purple-500" />,
  },
  {
    id: 4,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    action: "updated",
    task: "Fix mobile navigation bug",
    project: "Mobile App",
    time: "2 hours ago",
    icon: <Clock className="h-4 w-4 text-orange-500" />,
  },
  {
    id: 5,
    user: {
      name: "Michael Wong",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
    action: "completed",
    task: "Set up CI/CD pipeline",
    project: "DevOps",
    time: "3 hours ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{activity.user.name}</span>
              <span className="text-sm text-muted-foreground">{activity.action}</span>
              <span className="font-medium">{activity.task}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="text-xs">
                {activity.project}
              </Badge>
              <span className="text-muted-foreground">{activity.time}</span>
            </div>
          </div>
          <div className="mt-1">{activity.icon}</div>
        </div>
      ))}
    </div>
  )
}
