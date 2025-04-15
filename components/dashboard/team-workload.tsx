"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    role: "Frontend Developer",
    tasks: {
      total: 12,
      completed: 5,
    },
    workload: 75,
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SM",
    role: "UX Designer",
    tasks: {
      total: 8,
      completed: 6,
    },
    workload: 45,
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DC",
    role: "Backend Developer",
    tasks: {
      total: 15,
      completed: 7,
    },
    workload: 90,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ER",
    role: "QA Engineer",
    tasks: {
      total: 10,
      completed: 8,
    },
    workload: 60,
  },
]

export function TeamWorkload() {
  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <div key={member.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-muted-foreground">{member.role}</div>
              </div>
            </div>
            <div className="text-sm">
              {member.tasks.completed}/{member.tasks.total} tasks
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress
              value={member.workload}
              className="h-2"
              indicatorClassName={
                member.workload > 80 ? "bg-red-500" : member.workload > 60 ? "bg-orange-500" : "bg-green-500"
              }
            />
            <span className="text-xs font-medium">{member.workload}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}
