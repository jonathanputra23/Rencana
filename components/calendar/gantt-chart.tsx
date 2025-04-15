"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Sample project data
const projectData = {
  tasks: [
    {
      id: 1,
      name: "Project Planning",
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 3, 7),
      progress: 100,
      dependencies: [],
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      priority: "High",
    },
    {
      id: 2,
      name: "Design System",
      startDate: new Date(2023, 3, 8),
      endDate: new Date(2023, 3, 14),
      progress: 80,
      dependencies: [1],
      assignee: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      priority: "Medium",
    },
    {
      id: 3,
      name: "Frontend Development",
      startDate: new Date(2023, 3, 15),
      endDate: new Date(2023, 3, 28),
      progress: 60,
      dependencies: [2],
      assignee: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DC",
      },
      priority: "High",
    },
    {
      id: 4,
      name: "Backend API Development",
      startDate: new Date(2023, 3, 15),
      endDate: new Date(2023, 3, 28),
      progress: 70,
      dependencies: [1],
      assignee: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
      },
      priority: "Critical",
    },
    {
      id: 5,
      name: "Database Setup",
      startDate: new Date(2023, 3, 8),
      endDate: new Date(2023, 3, 14),
      progress: 100,
      dependencies: [1],
      assignee: {
        name: "Michael Wong",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MW",
      },
      priority: "Medium",
    },
    {
      id: 6,
      name: "Integration",
      startDate: new Date(2023, 3, 29),
      endDate: new Date(2023, 4, 5),
      progress: 30,
      dependencies: [3, 4],
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      priority: "High",
    },
    {
      id: 7,
      name: "Testing",
      startDate: new Date(2023, 4, 6),
      endDate: new Date(2023, 4, 12),
      progress: 0,
      dependencies: [6],
      assignee: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
      },
      priority: "Medium",
    },
    {
      id: 8,
      name: "Deployment",
      startDate: new Date(2023, 4, 13),
      endDate: new Date(2023, 4, 15),
      progress: 0,
      dependencies: [7],
      assignee: {
        name: "Michael Wong",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MW",
      },
      priority: "Critical",
    },
  ],
  milestones: [
    {
      id: 101,
      name: "Design Approval",
      date: new Date(2023, 3, 14),
      completed: true,
    },
    {
      id: 102,
      name: "MVP Release",
      date: new Date(2023, 4, 5),
      completed: false,
    },
    {
      id: 103,
      name: "Project Completion",
      date: new Date(2023, 4, 15),
      completed: false,
    },
  ],
}

// Helper function to format dates
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

// Helper function to get days between two dates
const getDaysBetween = (start, end) => {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((start.getTime() - end.getTime()) / oneDay))
}

// Helper function to get all dates in range for the chart
const getAllDatesInRange = (tasks) => {
  let minDate = new Date(Math.min(...tasks.map((task) => task.startDate.getTime())))
  let maxDate = new Date(Math.max(...tasks.map((task) => task.endDate.getTime())))

  // Ensure we have a full month view
  minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0)

  return { minDate, maxDate }
}

export function GanttChart() {
  const { minDate, maxDate } = getAllDatesInRange(projectData.tasks)
  const [currentViewStart, setCurrentViewStart] = useState(minDate)

  // Calculate the number of days to display (up to 30 days)
  const daysToShow = Math.min(30, getDaysBetween(currentViewStart, maxDate) + 1)

  // Generate dates for the header
  const headerDates = Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date(currentViewStart)
    date.setDate(date.getDate() + i)
    return date
  })

  // Navigate to previous/next time period
  const navigatePrevious = () => {
    const newDate = new Date(currentViewStart)
    newDate.setDate(newDate.getDate() - daysToShow)
    setCurrentViewStart(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentViewStart)
    newDate.setDate(newDate.getDate() + daysToShow)
    setCurrentViewStart(newDate)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          {formatDate(currentViewStart)} - {formatDate(headerDates[headerDates.length - 1])}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-auto">
        <div className="min-w-[800px]">
          {/* Header with dates */}
          <div className="flex border-b">
            <div className="w-[250px] p-2 font-medium border-r bg-muted/50">Task</div>
            <div className="flex-1 flex">
              {headerDates.map((date, index) => (
                <div
                  key={index}
                  className={`flex-1 min-w-[30px] p-2 text-center text-xs font-medium ${
                    date.getDay() === 0 || date.getDay() === 6 ? "bg-muted/30" : ""
                  }`}
                >
                  <div>{date.getDate()}</div>
                  <div className="text-muted-foreground">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          {projectData.tasks.map((task) => {
            // Calculate position and width for the task bar
            const taskStartDiff = Math.max(0, getDaysBetween(currentViewStart, task.startDate))
            const taskDuration = Math.min(getDaysBetween(task.startDate, task.endDate) + 1, daysToShow - taskStartDiff)

            // Skip if task is not in the current view
            if (taskStartDiff >= daysToShow || taskStartDiff + taskDuration <= 0) {
              return null
            }

            return (
              <div key={task.id} className="flex border-b">
                <div className="w-[250px] p-2 border-r flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                      <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{task.name}</span>
                  </div>
                  <Badge
                    variant={
                      task.priority === "Critical" ? "destructive" : task.priority === "High" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex-1 flex relative">
                  {headerDates.map((date, index) => (
                    <div
                      key={index}
                      className={`flex-1 min-w-[30px] border-r last:border-r-0 ${
                        date.getDay() === 0 || date.getDay() === 6 ? "bg-muted/30" : ""
                      }`}
                    ></div>
                  ))}
                  {/* Task bar */}
                  {taskDuration > 0 && (
                    <div
                      className="absolute top-1 h-8 rounded-md flex items-center justify-center text-xs font-medium text-white"
                      style={{
                        left: `${(taskStartDiff / daysToShow) * 100}%`,
                        width: `${(taskDuration / daysToShow) * 100}%`,
                        backgroundColor: task.progress === 100 ? "#10b981" : "#3b82f6",
                        opacity: 0.8 + task.progress / 500, // Adjust opacity based on progress
                      }}
                    >
                      {taskDuration > 3 ? `${task.progress}%` : ""}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Milestones */}
          {projectData.milestones.map((milestone) => {
            // Calculate position for the milestone
            const milestoneDiff = getDaysBetween(currentViewStart, milestone.date)

            // Skip if milestone is not in the current view
            if (milestoneDiff < 0 || milestoneDiff >= daysToShow) {
              return null
            }

            return (
              <div key={milestone.id} className="flex border-b">
                <div className="w-[250px] p-2 border-r flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${milestone.completed ? "bg-green-500" : "bg-orange-500"}`}
                    ></div>
                    <span className="text-sm font-medium">🏆 {milestone.name}</span>
                  </div>
                </div>
                <div className="flex-1 flex relative">
                  {headerDates.map((date, index) => (
                    <div
                      key={index}
                      className={`flex-1 min-w-[30px] border-r last:border-r-0 ${
                        date.getDay() === 0 || date.getDay() === 6 ? "bg-muted/30" : ""
                      }`}
                    ></div>
                  ))}
                  {/* Milestone marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0 border-l-2 border-dashed flex items-center justify-center"
                    style={{
                      left: `calc(${(milestoneDiff / daysToShow) * 100}% + 15px)`,
                      borderColor: milestone.completed ? "#10b981" : "#f97316",
                    }}
                  >
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center text-white -ml-2.5 ${
                        milestone.completed ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      <span className="text-xs">{milestone.completed ? "✓" : "!"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add new task button */}
          <div className="flex border-b">
            <div className="w-[250px] p-2 border-r">
              <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projectData.tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{task.name}</h3>
                    <Badge
                      variant={
                        task.priority === "Critical"
                          ? "destructive"
                          : task.priority === "High"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dependencies">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {projectData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2">
                    <div className="font-medium">
                      {task.id}. {task.name}
                    </div>
                    {task.dependencies.length > 0 && (
                      <div className="text-sm text-muted-foreground">depends on: {task.dependencies.join(", ")}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {Array.from(new Set(projectData.tasks.map((task) => task.assignee.name))).map((name, index) => {
                  const assigneeTasks = projectData.tasks.filter((task) => task.assignee.name === name)
                  const avatar = assigneeTasks[0].assignee.avatar
                  const initials = assigneeTasks[0].assignee.initials

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{name}</div>
                      </div>
                      <div className="pl-10 space-y-1">
                        {assigneeTasks.map((task) => (
                          <div key={task.id} className="text-sm flex justify-between">
                            <span>{task.name}</span>
                            <span className="text-muted-foreground">
                              {formatDate(task.startDate)} - {formatDate(task.endDate)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
