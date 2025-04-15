"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
import { Calendar, MessageSquare, Plus, Sparkles } from "lucide-react"
import { AIDescriptionGenerator } from "@/components/tasks/ai-description-generator"

// Initial board data
const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Update user authentication flow",
      description: "Implement OAuth 2.0 and add social login options",
      priority: "High",
      dueDate: "2023-04-20",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      comments: 3,
    },
    "task-2": {
      id: "task-2",
      title: "Fix responsive layout issues",
      description: "Address UI bugs on mobile devices",
      priority: "Medium",
      dueDate: "2023-04-18",
      assignee: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SM",
      },
      comments: 5,
    },
    "task-3": {
      id: "task-3",
      title: "Implement dark mode",
      description: "Add dark mode toggle and update theme colors",
      priority: "Low",
      dueDate: "2023-04-25",
      assignee: {
        name: "David Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DC",
      },
      comments: 2,
    },
    "task-4": {
      id: "task-4",
      title: "Optimize image loading",
      description: "Implement lazy loading for images",
      priority: "Medium",
      dueDate: "2023-04-22",
      assignee: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
      },
      comments: 0,
    },
    "task-5": {
      id: "task-5",
      title: "Add unit tests for API endpoints",
      description: "Increase test coverage for critical endpoints",
      priority: "High",
      dueDate: "2023-04-19",
      assignee: {
        name: "Michael Wong",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MW",
      },
      comments: 1,
    },
    "task-6": {
      id: "task-6",
      title: "Update documentation",
      description: "Update API documentation with new endpoints",
      priority: "Low",
      dueDate: "2023-04-28",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      comments: 0,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Backlog",
      taskIds: ["task-6"],
    },
    "column-2": {
      id: "column-2",
      title: "To Do",
      taskIds: ["task-3", "task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "In Progress",
      taskIds: ["task-1", "task-5"],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: ["task-2"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
}

export function KanbanBoard() {
  const [boardData, setBoardData] = useState(initialData)
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [newTaskColumn, setNewTaskColumn] = useState("")
  const [useAIDescription, setUseAIDescription] = useState(false)
  const [newTaskDescription, setNewTaskDescription] = useState("")

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or if the item was dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const sourceColumn = boardData.columns[source.droppableId]
    const destinationColumn = boardData.columns[destination.droppableId]

    // If moving within the same column
    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      }

      setBoardData(newBoardData)
      return
    }

    // Moving from one column to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds)
    sourceTaskIds.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    }

    const destinationTaskIds = Array.from(destinationColumn.taskIds)
    destinationTaskIds.splice(destination.index, 0, draggableId)
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    }

    const newBoardData = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    }

    setBoardData(newBoardData)
  }

  const handleAddNewTask = (columnId) => {
    setNewTaskColumn(columnId)
    setIsNewTaskDialogOpen(true)
    setUseAIDescription(false)
    setNewTaskDescription("")
  }

  const handleCreateTask = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get("title")
    const description = useAIDescription ? newTaskDescription : formData.get("description")
    const priority = formData.get("priority")
    const dueDate = formData.get("dueDate")

    // Create a new task
    const newTaskId = `task-${Date.now()}`
    const newTask = {
      id: newTaskId,
      title,
      description,
      priority,
      dueDate,
      assignee: {
        name: "Alex Johnson", // Default assignee for demo
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      comments: 0,
    }

    // Add the task to the board data
    const column = boardData.columns[newTaskColumn]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.push(newTaskId)

    const newBoardData = {
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...boardData.columns,
        [newTaskColumn]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    }

    setBoardData(newBoardData)
    setIsNewTaskDialogOpen(false)
  }

  const handleDescriptionGenerated = (description) => {
    setNewTaskDescription(description)
    setUseAIDescription(true)
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId]
            const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId])

            return (
              <div key={column.id} className="flex-shrink-0 w-[300px]">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{column.title}</h3>
                    <Badge variant="outline">{tasks.length}</Badge>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3 min-h-[200px]">
                        {tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <Card>
                                  <CardHeader className="p-3 pb-0">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium text-sm">{task.title}</h4>
                                      <Badge
                                        variant={
                                          task.priority === "High"
                                            ? "destructive"
                                            : task.priority === "Medium"
                                              ? "default"
                                              : "secondary"
                                        }
                                        className="text-xs"
                                      >
                                        {task.priority}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="p-3 pt-2">
                                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                                  </CardContent>
                                  <CardFooter className="p-3 pt-0 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={task.assignee.avatar || "/placeholder.svg"}
                                          alt={task.assignee.name}
                                        />
                                        <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(task.dueDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                    {task.comments > 0 && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        {task.comments}
                                      </div>
                                    )}
                                  </CardFooter>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => handleAddNewTask(column.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Task
                        </Button>
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a new task to the board. Fill in the details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateTask}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Task title" required />
              </div>

              {useAIDescription ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUseAIDescription(false)}
                      className="h-8 text-xs"
                    >
                      Edit manually
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-md text-sm">{newTaskDescription}</div>
                  <input type="hidden" name="description" value={newTaskDescription} />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUseAIDescription(true)}
                      className="h-8 text-xs flex items-center"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate with AI
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Task description"
                    className="min-h-[100px]"
                  />
                </div>
              )}

              {useAIDescription && (
                <div className="p-4 border rounded-md bg-muted/50">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-1 text-primary" />
                    AI Description Generator
                  </h4>
                  <AIDescriptionGenerator onDescriptionGenerated={handleDescriptionGenerated} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    defaultValue="Medium"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
