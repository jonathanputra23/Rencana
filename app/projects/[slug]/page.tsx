"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { KanbanBoard } from "@/components/boards/kanban-board"
import { GanttChart } from "@/components/calendar/gantt-chart"
import { Clock, ListTodo, Users } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectTaskList } from "@/components/projects/project-task-list"
import { TaskGenerator } from "@/components/ai/task-generator"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch project data based on the slug
  const projectName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Sample project description
  const projectDescription =
    projectName === "Web App Development"
      ? "A comprehensive web application for customer portal with user authentication, dashboard, and reporting features. The project includes both frontend and backend development with modern technologies."
      : "Project description would be loaded here based on the project slug."

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <DashboardHeader />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/projects" className="text-sm text-muted-foreground hover:underline">
                Projects
              </Link>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium">{projectName}</span>
            </div>
            <h1 className="text-2xl font-bold mt-1">{projectName}</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">{projectDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Timeline
            </Button>
            <TaskGenerator />
            <Button>
              <ListTodo className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">-2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="flex -space-x-2 mt-2">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion status of the project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Progress</p>
                  <p className="text-sm text-muted-foreground">65% complete</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>In Progress</Badge>
                  <Badge variant="outline">Due Apr 28, 2023</Badge>
                </div>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="board" className="mt-6">
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="board" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Board</CardTitle>
                <CardDescription>Manage tasks using Kanban board</CardDescription>
              </CardHeader>
              <CardContent>
                <KanbanBoard />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Task List</CardTitle>
                <CardDescription>View all tasks in a list format</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectTaskList projectSlug={params.slug} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>View project timeline and task dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <GanttChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Project team and resource allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Alex Johnson",
                      role: "Frontend Developer",
                      avatar: "/placeholder.svg?height=64&width=64",
                      initials: "AJ",
                      tasks: 5,
                      email: "alex.johnson@example.com",
                    },
                    {
                      name: "Sarah Miller",
                      role: "UX Designer",
                      avatar: "/placeholder.svg?height=64&width=64",
                      initials: "SM",
                      tasks: 3,
                      email: "sarah.miller@example.com",
                    },
                    {
                      name: "David Chen",
                      role: "Backend Developer",
                      avatar: "/placeholder.svg?height=64&width=64",
                      initials: "DC",
                      tasks: 7,
                      email: "david.chen@example.com",
                    },
                    {
                      name: "Emily Rodriguez",
                      role: "QA Engineer",
                      avatar: "/placeholder.svg?height=64&width=64",
                      initials: "ER",
                      tasks: 4,
                      email: "emily.rodriguez@example.com",
                    },
                    {
                      name: "Michael Wong",
                      role: "DevOps Engineer",
                      avatar: "/placeholder.svg?height=64&width=64",
                      initials: "MW",
                      tasks: 5,
                      email: "michael.wong@example.com",
                    },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{member.tasks} tasks</Badge>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="files" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>Documents and resources related to the project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Project Requirements.pdf",
                      size: "2.4 MB",
                      updatedAt: "Apr 15, 2023",
                      updatedBy: "Alex Johnson",
                    },
                    {
                      name: "Design Mockups.fig",
                      size: "8.7 MB",
                      updatedAt: "Apr 12, 2023",
                      updatedBy: "Sarah Miller",
                    },
                    {
                      name: "API Documentation.md",
                      size: "1.2 MB",
                      updatedAt: "Apr 10, 2023",
                      updatedBy: "David Chen",
                    },
                    {
                      name: "Test Plan.docx",
                      size: "3.5 MB",
                      updatedAt: "Apr 8, 2023",
                      updatedBy: "Emily Rodriguez",
                    },
                    {
                      name: "Deployment Guide.pdf",
                      size: "4.1 MB",
                      updatedAt: "Apr 5, 2023",
                      updatedBy: "Michael Wong",
                    },
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • Updated on {file.updatedAt} by {file.updatedBy}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
