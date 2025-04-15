"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Sample task data
const projectTasks = {
  "web-app-development": [
    {
      id: "TASK-001",
      title: "Set up authentication system",
      description: "Implement OAuth 2.0 and add social login options",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-04-20",
      isCompleted: false,
      isOverdue: false,
      pic: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      comments: 3,
      subtasks: [
        { id: "ST-001", title: "Research OAuth providers", isCompleted: true },
        { id: "ST-002", title: "Implement Google login", isCompleted: false },
        { id: "ST-003", title: "Implement Facebook login", isCompleted: false },
      ],
    },
    {
      id: "TASK-002",
      title: "Design user dashboard",
      description: "Create wireframes and mockups for the user dashboard",
      status: "Done",
      priority: "Medium",
      dueDate: "2023-04-15",
      isCompleted: true,
      isOverdue: false,
      pic: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      comments: 5,
      subtasks: [
        { id: "ST-004", title: "Create wireframes", isCompleted: true },
        { id: "ST-005", title: "Design mockups", isCompleted: true },
        { id: "ST-006", title: "Get feedback", isCompleted: true },
      ],
    },
    {
      id: "TASK-003",
      title: "Implement responsive layout",
      description: "Ensure the application works well on all device sizes",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-04-25",
      isCompleted: false,
      isOverdue: false,
      pic: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DC",
      },
      comments: 0,
      subtasks: [
        { id: "ST-007", title: "Mobile layout", isCompleted: false },
        { id: "ST-008", title: "Tablet layout", isCompleted: false },
        { id: "ST-009", title: "Desktop layout", isCompleted: false },
      ],
    },
    {
      id: "TASK-004",
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment",
      status: "To Do",
      priority: "Low",
      dueDate: "2023-04-30",
      isCompleted: false,
      isOverdue: false,
      pic: {
        name: "Michael Wong",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MW",
      },
      comments: 1,
      subtasks: [
        { id: "ST-010", title: "Set up GitHub Actions", isCompleted: false },
        { id: "ST-011", title: "Configure test automation", isCompleted: false },
        { id: "ST-012", title: "Set up deployment to staging", isCompleted: false },
      ],
    },
    {
      id: "TASK-005",
      title: "Implement user profile page",
      description: "Create user profile page with edit functionality",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-04-22",
      isCompleted: false,
      isOverdue: false,
      pic: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
      },
      comments: 2,
      subtasks: [
        { id: "ST-013", title: "Design profile page", isCompleted: true },
        { id: "ST-014", title: "Implement profile view", isCompleted: true },
        { id: "ST-015", title: "Implement profile edit", isCompleted: false },
      ],
    },
  ],
  "mobile-app-development": [
    {
      id: "TASK-101",
      title: "Set up React Native project",
      description: "Initialize React Native project with TypeScript",
      status: "Done",
      priority: "High",
      dueDate: "2023-04-10",
      isCompleted: true,
      isOverdue: false,
      pic: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DC",
      },
      comments: 0,
      subtasks: [],
    },
    {
      id: "TASK-102",
      title: "Design app navigation",
      description: "Create navigation structure for the mobile app",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-04-18",
      isCompleted: false,
      isOverdue: true,
      pic: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      comments: 3,
      subtasks: [],
    },
  ],
  // Add more projects as needed
}

export function ProjectTaskList({ projectSlug }: { projectSlug: string }) {
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  // Get tasks for the current project
  const tasks = projectTasks[projectSlug] || []

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setIsTaskDialogOpen(true)
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center">
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center">
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center">
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-[120px]">Assignee</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleTaskClick(task)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={task.isCompleted} />
                </TableCell>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[300px]">{task.description}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.status === "Done"
                        ? "default"
                        : task.status === "In Progress"
                          ? "secondary"
                          : task.status === "To Do"
                            ? "outline"
                            : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {task.isOverdue && !task.isCompleted ? <AlertCircle className="h-4 w-4 text-red-500" /> : null}
                    <span className={task.isOverdue && !task.isCompleted ? "text-red-500 font-medium" : ""}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.pic.avatar || "/placeholder.svg"} alt={task.pic.name} />
                      <AvatarFallback>{task.pic.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs truncate max-w-[80px]">{task.pic.name}</span>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Task Detail Dialog */}
      {selectedTask && (
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{selectedTask.id}</span>
                <Badge
                  variant={
                    selectedTask.status === "Done"
                      ? "default"
                      : selectedTask.status === "In Progress"
                        ? "secondary"
                        : selectedTask.status === "To Do"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {selectedTask.status}
                </Badge>
                <Badge
                  variant={
                    selectedTask.priority === "High"
                      ? "destructive"
                      : selectedTask.priority === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {selectedTask.priority}
                </Badge>
              </div>
              <DialogTitle className="text-xl">{selectedTask.title}</DialogTitle>
              <DialogDescription>Created on Apr 10, 2023 • Updated 2 days ago</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="subtasks">Subtasks ({selectedTask.subtasks?.length || 0})</TabsTrigger>
                <TabsTrigger value="comments">Comments ({selectedTask.comments})</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Description</h3>
                        <p className="text-sm">{selectedTask.description}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Add Comment</h3>
                        <Textarea placeholder="Type your comment here..." className="min-h-[100px]" />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">Add Comment</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Assignee</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={selectedTask.pic.avatar || "/placeholder.svg"}
                            alt={selectedTask.pic.name}
                          />
                          <AvatarFallback>{selectedTask.pic.initials}</AvatarFallback>
                        </Avatar>
                        <span>{selectedTask.pic.name}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-1">Due Date</h3>
                      <div className="flex items-center gap-1">
                        {selectedTask.isOverdue && !selectedTask.isCompleted ? (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : null}
                        <span
                          className={
                            selectedTask.isOverdue && !selectedTask.isCompleted ? "text-red-500 font-medium" : ""
                          }
                        >
                          {new Date(selectedTask.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-1">Status</h3>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue={selectedTask.status}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-1">Priority</h3>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue={selectedTask.priority}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="subtasks" className="space-y-4 mt-4">
                <div className="space-y-2">
                  {selectedTask.subtasks && selectedTask.subtasks.length > 0 ? (
                    selectedTask.subtasks.map((subtask: any) => (
                      <div key={subtask.id} className="flex items-center gap-2 p-2 border rounded-md">
                        <Checkbox checked={subtask.isCompleted} />
                        <span className={subtask.isCompleted ? "line-through text-muted-foreground" : ""}>
                          {subtask.title}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No subtasks found</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Add Subtask</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Subtask title" className="flex-1" />
                    <Button>Add</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {selectedTask.comments > 0 ? (
                    Array.from({ length: selectedTask.comments }).map((_, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{index % 2 === 0 ? selectedTask.pic.initials : "SM"}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {index % 2 === 0 ? selectedTask.pic.name : "Sarah Miller"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {index === 0 ? "2 days ago" : index === 1 ? "3 days ago" : "5 days ago"}
                          </span>
                        </div>
                        <p className="text-sm">
                          {index === 0
                            ? "I've started working on this. Will update the progress soon."
                            : index === 1
                              ? "Let me know if you need any help with this task."
                              : "This looks good. Let's make sure we complete it before the deadline."}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No comments yet</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Add Comment</h3>
                  <div className="space-y-2">
                    <Textarea placeholder="Type your comment here..." className="min-h-[100px]" />
                    <div className="flex justify-end">
                      <Button>Add Comment</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{selectedTask.pic.name}</span> changed status from{" "}
                        <Badge variant="outline" className="text-xs">
                          To Do
                        </Badge>{" "}
                        to{" "}
                        <Badge variant="secondary" className="text-xs">
                          In Progress
                        </Badge>
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Sarah Miller</span> added a comment
                      </p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Alex Johnson</span> created this task
                      </p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                Close
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
