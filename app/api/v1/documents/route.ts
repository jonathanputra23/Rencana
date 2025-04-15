import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const projectId = url.searchParams.get("projectId")
    const phase = url.searchParams.get("phase")
    const page = parseInt(url.searchParams.get("page") || "1")
    const limit = parseInt(url.searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build query filters
    const where: any = {}
    
    if (projectId) {
      const projectIdInt = parseInt(projectId)
      if (!isNaN(projectIdInt)) {
        where.projectId = projectIdInt
      }
    }
    
    if (phase) {
      where.phase = phase
    }

    // Get documents with count
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        },
        include: {
          project: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }),
      prisma.document.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: documents,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
    })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ success: false, message: "Error fetching documents" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.title || !body.projectId || !body.phase) {
      return NextResponse.json({ 
        success: false, 
        message: "Title, project ID, and phase are required" 
      }, { status: 400 })
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

    // Create a new document
    const newDocument = await prisma.document.create({
      data: {
        title: body.title,
        content: body.content || "",
        phase: body.phase,
        projectId: projectId
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: newDocument,
        message: "Document created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ success: false, message: "Error creating document" }, { status: 500 })
  }
}