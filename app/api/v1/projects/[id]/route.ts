import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = parseInt(params.id)
    
    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 })
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        documents: {
          select: {
            id: true,
            phase: true,
            title: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    // Transform data to include task counts and format response
    const totalTasks = project.tasks.length
    const completedTasks = project.tasks.filter((task: any) => task.status === 'Done').length
    
    // Format the response
    const formattedProject = {
      ...project,
      tasks: {
        items: project.tasks,
        total: totalTasks,
        completed: completedTasks
      }
    }

    return NextResponse.json({ success: true, data: formattedProject })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ success: false, message: "Error fetching project" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = parseInt(params.id)
    
    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 })
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!existingProject) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    const body = await req.json()

    // Update project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        description: body.description !== undefined ? body.description : undefined,
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ success: false, message: "Error updating project" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = parseInt(params.id)
    
    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 })
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!existingProject) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    // Delete project (this will cascade delete tasks and documents)
    await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ success: false, message: "Error deleting project" }, { status: 500 })
  }
}
