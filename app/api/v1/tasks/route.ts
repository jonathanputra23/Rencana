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
  {
    id: "task-3",
    title: "Implement dark mode",
    description: "Add dark mode toggle and update theme colors",
    projectId: "1",
    status: "To Do",
    priority: "Low",
    dueDate: "2023-04-25",
    assignee: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    comments: 2,
    attachments: 0,
    createdAt: "2023-03-20T14:00:00Z",
    updatedAt: "2023-03-20T14:00:00Z",
  },
  {
    id: "task-4",
    title: "Optimize image loading",
    description: "Implement lazy loading for images",
    projectId: "1",
    status: "To Do",
    priority: "Medium",
    dueDate: "2023-04-22",
    assignee: {
      id: "user-4",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    comments: 0,
    attachments: 0,
    createdAt: "2023-03-22T11:30:00Z",
    updatedAt: "2023-03-22T11:30:00Z",
  },
  {
    id: "task-5",
    title: "Add unit tests for API endpoints",
    description: "Increase test coverage for critical endpoints",
    projectId: "3",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-04-19",
    assignee: {
      id: "user-3",
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DC",
    },
    comments: 1,
    attachments: 0,
    createdAt: "2023-03-25T09:15:00Z",
    updatedAt: "2023-04-12T16:20:00Z",
  },
  {
    id: "task-6",
    title: "Update API documentation",
    description: "Update API documentation with new endpoints",
    projectId: "3",
    status: "To Do",
    priority: "Low",
    dueDate: "2023-04-28",
    assignee: {
      id: "user-8",
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "LW",
    },
    comments: 0,
    attachments: 0,
    createdAt: "2023-03-28T13:45:00Z",
    updatedAt: "2023-03-28T13:45:00Z",
  },
  {
    id: "task-7",
    title: "Implement push notifications",
    description: "Add push notification support for mobile app",
    projectId: "2",
    status: "To Do",
    priority: "Medium",
    dueDate: "2023-05-05",
    assignee: {
      id: "user-7",
      name: "Robert Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RK",
    },
    comments: 1,
    attachments: 0,
    createdAt: "2023-04-01T10:30:00Z",
    updatedAt: "2023-04-01T10:30:00Z",
  },
  {
    id: "task-8",
    title: "Design onboarding screens",
    description: "Create user onboarding flow for mobile app",
    projectId: "2",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-04-25",
    assignee: {
      id: "user-2",
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    comments: 4,
    attachments: 3,
    createdAt: "2023-04-02T09:00:00Z",
    updatedAt: "2023-04-15T11:20:00Z",
  },
]

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const projectId = url.searchParams.get("projectId")
    const status = url.searchParams.get("status")
    const assigneeId = url.searchParams.get("assigneeId")
    const priority = url.searchParams.get("priority")
    const dueDate = url.searchParams.get("dueDate")

    // Filter tasks based on query parameters
    let filteredTasks = [...tasks]

    if (projectId) {
      filteredTasks = filteredTasks.filter((task) => task.projectId === projectId)
    }

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status.toLowerCase() === status.toLowerCase())
    }

    if (assigneeId) {
      filteredTasks = filteredTasks.filter((task) => task.assignee.id === assigneeId)
    }

    if (priority) {
      filteredTasks = filteredTasks.filter((task) => task.priority.toLowerCase() === priority.toLowerCase())
    }

    if (dueDate) {
      filteredTasks = filteredTasks.filter((task) => task.dueDate === dueDate)
    }

    return NextResponse.json({
      success: true,
      data: filteredTasks,
      meta: {
        total: filteredTasks.length,
        page: 1,
        limit: 10,
      },
    })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ success: false, message: "Error fetching tasks" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.title || !body.projectId) {
      return NextResponse.json({ success: false, message: "Title and project ID are required" }, { status: 400 })
    }

    // Create a new task
    const newTask = {
      id: `task-${tasks.length + 1}`,
      title: body.title,
      description: body.description || "",
      projectId: body.projectId,
      status: body.status || "To Do",
      priority: body.priority || "Medium",
      dueDate: body.dueDate,
      assignee: body.assignee || null,
      comments: 0,
      attachments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    // For this example, we'll just return the new task

    return NextResponse.json(
      {
        success: true,
        data: newTask,
        message: "Task created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ success: false, message: "Error creating task" }, { status: 500 })
  }
}
