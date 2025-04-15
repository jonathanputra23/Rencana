"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Calendar, Edit, MessageSquare, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample task data
const allTasks = [
  {
    id: 1,
    title: "Update user authentication flow",
    description: "Implement OAuth 2.0 and add social login options",
    project: "Web App",
    priority: "High",
    status: "In Progress",
    dueDate: "2023-04-20",
    isCompleted: false,
    isOverdue: false,
    isDueToday: true,
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 3,
  },
  {
    id: 2,
    title: "Fix responsive layout issues",
    description: "Address UI bugs on mobile devices",
    project: "Mobile App",
    priority: "Medium",
    status: "Done",
    dueDate: "2023-04-18",
    isCompleted: true,
    isOverdue: false,
    isDueToday: false,
    assignee: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    comments: 5,
  },
  {
    id: 3,
    title: "Implement dark mode",
    description: "Add dark mode toggle and update theme colors",
    project: "Web App",
    priority: "Low",
    status: "To Do",
    dueDate: "2023-04-25",
    isCompleted: false,
    isOverdue: false,
    isDueToday: false,
    assignee: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DC",
    },
    comments: 2,
  },
  {
    id: 4,
    title: "Optimize image loading",
    description: "Implement lazy loading for images",
    project: "Web App",
    priority: "Medium",
    status: "To Do",
    dueDate: "2023-04-22",
    isCompleted: false,
    isOverdue: false,
    isDueToday: false,
    assignee: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    comments: 0,
  },
  {
    id: 5,
    title: "Add unit tests for API endpoints",
    description: "Increase test coverage for critical endpoints",
    project: "API",
    priority: "High",
    status: "In Progress",
    dueDate: "2023-04-19",
    isCompleted: false,
    isOverdue: true,
    isDueToday: false,
    assignee: {
      name: "Michael Wong",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
    comments: 1,
  },
  {
    id: 6,
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    project: "API",
    priority: "Low",
    status: "To Do",
    dueDate: "2023-04-28",
    isCompleted: false,
    isOverdue: false,
    isDueToday: false,
    assignee: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 0,
  },
]

export function TaskList({ filter = "all" }) {
  const [tasks, setTasks] = useState(allTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "today") return task.isDueToday
    if (filter === "upcoming") return !task.isCompleted && !task.isDueToday
    if (filter === "completed") return task.isCompleted
    return true
  })

  const handleTaskCompletion = (taskId, isCompleted) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isCompleted } : task)))
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsEditDialogOpen(true)
  }

  const handleSaveTask = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedTask = {
      ...selectedTask,
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate"),
    }

    setTasks(tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task)))

    setIsEditDialogOpen(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-start gap-4 p-4 rounded-lg border ${
              task.isOverdue && !task.isCompleted
                ? "border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900"
                : ""
            }`}
          >
            <Checkbox
              checked={task.isCompleted}
              onCheckedChange={(checked) => handleTaskCompletion(task.id, checked)}
              className="mt-1"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-medium ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm text-muted-foreground ${task.isCompleted ? "line-through" : ""}`}>
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                  <Badge variant="outline">{task.project}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                    <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-muted-foreground">{task.assignee.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline">{task.status}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  {task.isOverdue && !task.isCompleted ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span
                    className={
                      task.isOverdue && !task.isCompleted ? "text-red-500 font-medium" : "text-muted-foreground"
                    }
                  >
                    {new Date(task.dueDate).toLocaleDateString()}
                    {task.isDueToday && " (Today)"}
                  </span>
                </div>
                {task.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{task.comments}</span>
                  </div>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEditTask(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      )}

      {/* Edit Task Dialog */}
      {selectedTask && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Make changes to the task details below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveTask}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={selectedTask.title} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={selectedTask.description}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      name="priority"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue={selectedTask.priority}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      defaultValue={selectedTask.status}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" defaultValue={selectedTask.dueDate} required />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
