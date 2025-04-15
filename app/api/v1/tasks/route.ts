import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const projectId = url.searchParams.get("projectId")
    const status = url.searchParams.get("status")
    const assigneeId = url.searchParams.get("assigneeId")
    const priority = url.searchParams.get("priority")
    const dueDate = url.searchParams.get("dueDate")
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (projectId) {
      where.projectId = parseInt(projectId)
    }
    
    if (status) {
      where.status = status
    }
    
    if (assigneeId) {
      where.assigneeId = parseInt(assigneeId)
    }
    
    if (priority) {
      where.priority = priority
    }
    
    if (dueDate) {
      where.dueDate = new Date(dueDate)
    }

    // Get tasks with count
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        },
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          project: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }),
      prisma.task.count({ where })
    ])

    // Format tasks for response
    const formattedTasks = tasks.map((task: any) => {
      // Create initials from assignee name if available
      let initials = null
      if (task.assignee) {
        initials = task.assignee.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
      }

      return {
        ...task,
        assignee: task.assignee ? {
          ...task.assignee,
          avatar: "/placeholder.svg?height=32&width=32",
          initials: initials
        } : null,
        // Add placeholder values for comments and attachments
        // In a real implementation, these would be relations in the database
        comments: 0,
        attachments: 0
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedTasks,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
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

    // Validate project exists
    const projectId = parseInt(body.projectId)
    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    // Validate assignee if provided
    let assigneeId = null
    if (body.assigneeId) {
      assigneeId = parseInt(body.assigneeId)
      if (isNaN(assigneeId)) {
        return NextResponse.json({ success: false, message: "Invalid assignee ID" }, { status: 400 })
      }

      const assignee = await prisma.user.findUnique({
        where: { id: assigneeId }
      })

      if (!assignee) {
        return NextResponse.json({ success: false, message: "Assignee not found" }, { status: 404 })
      }
    }

    // Parse due date if provided
    let dueDate = undefined
    if (body.dueDate) {
      dueDate = new Date(body.dueDate)
      if (isNaN(dueDate.getTime())) {
        return NextResponse.json({ success: false, message: "Invalid due date format" }, { status: 400 })
      }
    }

    // Create a new task
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || "",
        projectId: projectId,
        status: body.status || "To Do",
        priority: body.priority || "Medium",
        dueDate: dueDate,
        assigneeId: assigneeId
      },
      include: {
        assignee: true,
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Format the response
    const formattedTask = {
      ...newTask,
      assignee: newTask.assignee ? {
        ...newTask.assignee,
        avatar: "/placeholder.svg?height=32&width=32",
        initials: newTask.assignee.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
      } : null,
      comments: 0,
      attachments: 0
    }

    return NextResponse.json(
      {
        success: true,
        data: formattedTask,
        message: "Task created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ success: false, message: "Error creating task" }, { status: 500 })
  }
}
