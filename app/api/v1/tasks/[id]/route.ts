import { NextResponse } from "next/server"

// Sample task data
const tasks = [
  {
    id: "task-1",
    title: "Update user authentication flow",
    description: "Implement OAuth 2.0 and add social login options",
    projectId: "1",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-04-20",
    assignee: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 3,
    attachments: 2,
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-04-10T14:30:00Z",
  },
  {
    id: "task-2",
    title: "Fix responsive layout issues",
    description: "Address UI bugs on mobile devices",
    projectId: "1",
    status: "Done",
    priority: "Medium",
    dueDate: "2023-04-18",
    assignee: {
      id: "user-2",
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    comments: 5,
    attachments: 1,
    createdAt: "2023-03-16T09:00:00Z",
    updatedAt: "2023-04-18T11:45:00Z",
  },
]

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const task = tasks.find((t) => t.id === params.id)

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ success: false, message: "Error fetching task" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === params.id)

    if (taskIndex === -1) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    const body = await req.json()

    // Update task
    const updatedTask = {
      ...tasks[taskIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would update this in a database
    // For this example, we'll just return the updated task

    return NextResponse.json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ success: false, message: "Error updating task" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === params.id)

    if (taskIndex === -1) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    // In a real app, you would delete this from a database
    // For this example, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ success: false, message: "Error deleting task" }, { status: 500 })
  }
}
