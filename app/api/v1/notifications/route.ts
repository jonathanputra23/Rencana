import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")
    const taskId = url.searchParams.get("taskId")
    const status = url.searchParams.get("status")
    const type = url.searchParams.get("type")
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (userId) {
      const userIdInt = parseInt(userId)
      if (!isNaN(userIdInt)) {
        where.userId = userIdInt
      }
    }
    
    if (taskId) {
      const taskIdInt = parseInt(taskId)
      if (!isNaN(taskIdInt)) {
        where.taskId = taskIdInt
      }
    }
    
    if (status) {
      where.status = status
    }
    
    if (type) {
      where.type = type
    }

    // Get notifications with count
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          sentAt: 'desc'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          },
          task: {
            select: {
              id: true,
              title: true,
              status: true,
              project: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.notification.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: notifications,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ success: false, message: "Error fetching notifications" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.userId || !body.taskId || !body.type) {
      return NextResponse.json({ 
        success: false, 
        message: "User ID, task ID, and notification type are required" 
      }, { status: 400 })
    }

    // Validate user exists
    const userId = parseInt(body.userId)
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Validate task exists
    const taskId = parseInt(body.taskId)
    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, message: "Invalid task ID" }, { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    // Create a new notification
    const newNotification = await prisma.notification.create({
      data: {
        type: body.type,
        status: body.status || "Sent",
        userId: userId,
        taskId: taskId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        task: {
          select: {
            id: true,
            title: true,
            status: true,
            project: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: newNotification,
        message: "Notification created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ success: false, message: "Error creating notification" }, { status: 500 })
  }
}