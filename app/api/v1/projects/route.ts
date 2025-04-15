import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status")
    const assigneeId = url.searchParams.get("assigneeId")
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (assigneeId) {
      where.tasks = {
        some: {
          assigneeId: parseInt(assigneeId)
        }
      }
    }

    // Get projects with count
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        },
        include: {
          tasks: {
            select: {
              id: true,
              status: true
            }
          }
        }
      }),
      prisma.project.count({ where })
    ])

    // Transform data to include task counts
    const projectsWithTaskCounts = projects.map((project: any) => {
      const totalTasks = project.tasks.length
      const completedTasks = project.tasks.filter((task: any) => task.status === 'Done').length
      
      // Remove tasks array from response
      const { tasks, ...projectData } = project
      
      return {
        ...projectData,
        tasks: {
          total: totalTasks,
          completed: completedTasks
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: projectsWithTaskCounts,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ success: false, message: "Error fetching projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ success: false, message: "Project name is required" }, { status: 400 })
    }

    // Create a new project
    const newProject = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description || ""
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          ...newProject,
          tasks: {
            total: 0,
            completed: 0
          }
        },
        message: "Project created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ success: false, message: "Error creating project" }, { status: 500 })
  }
}
