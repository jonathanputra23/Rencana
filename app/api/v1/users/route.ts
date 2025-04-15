import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const role = url.searchParams.get("role")
    const projectId = url.searchParams.get("projectId")
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (role) {
      where.role = role
    }
    
    // For project filtering, we need to find users who have tasks in the project
    let userIds: number[] = []
    if (projectId) {
      const projectIdInt = parseInt(projectId)
      if (!isNaN(projectIdInt)) {
        const tasksInProject = await prisma.task.findMany({
          where: { projectId: projectIdInt },
          select: { assigneeId: true }
        })
        
        userIds = tasksInProject
          .filter((task: any) => task.assigneeId !== null)
          .map((task: any) => task.assigneeId as number)
          
        // If no users found for this project, return empty array
        if (userIds.length === 0) {
          return NextResponse.json({
            success: true,
            data: [],
            meta: {
              total: 0,
              page,
              limit,
              pages: 0
            },
          })
        }
        
        where.id = { in: userIds }
      }
    }

    // Get users with count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc'
        },
        include: {
          tasks: {
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
      prisma.user.count({ where })
    ])

    // Format users for response
    const formattedUsers = users.map((user: any) => {
      // Create initials from name
      const initials = user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
      
      // Get unique project IDs from tasks
      const projectIds = [...new Set(user.tasks.map((task: any) => task.project.id))]
      
      // Format the response
      return {
        id: user.id,
        name: user.name,
        avatar: "/placeholder.svg?height=32&width=32",
        initials,
        role: user.role,
        telegram_id: user.telegram_id,
        tasks: user.tasks.map((task: any) => task.id),
        projects: projectIds,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, message: "Error fetching users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // In a real app, this would be protected by authentication middleware
    // For now, we'll implement the functionality
    
    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json({
        success: false,
        message: "Name and email are required"
      }, { status: 400 })
    }
    
    // Check if user with this email already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: body.email }
    })
    
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User with this email already exists"
      }, { status: 409 })
    }
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role || "member",
        telegram_id: body.telegram_id || null
      }
    })
    
    // Format the response
    const initials = newUser.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      
    const formattedUser = {
      ...newUser,
      avatar: "/placeholder.svg?height=32&width=32",
      initials,
      tasks: [],
      projects: []
    }

    return NextResponse.json(
      {
        success: true,
        data: formattedUser,
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, message: "Error creating user" }, { status: 500 })
  }
}
