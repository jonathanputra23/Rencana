import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const documentId = parseInt(params.id)
    
    if (isNaN(documentId)) {
      return NextResponse.json({ success: false, message: "Invalid document ID" }, { status: 400 })
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!document) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: document })
  } catch (error) {
    console.error("Error fetching document:", error)
    return NextResponse.json({ success: false, message: "Error fetching document" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const documentId = parseInt(params.id)
    
    if (isNaN(documentId)) {
      return NextResponse.json({ success: false, message: "Invalid document ID" }, { status: 400 })
    }

    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!existingDocument) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    const body = await req.json()

    // Validate project ID if provided
    let projectId = undefined
    if (body.projectId !== undefined) {
      projectId = parseInt(body.projectId)
      if (isNaN(projectId)) {
        return NextResponse.json({ success: false, message: "Invalid project ID" }, { status: 400 })
      }

      const project = await prisma.project.findUnique({
        where: { id: projectId }
      })

      if (!project) {
        return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
      }
    }

    // Update document
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        content: body.content !== undefined ? body.content : undefined,
        phase: body.phase !== undefined ? body.phase : undefined,
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

    return NextResponse.json({
      success: true,
      data: updatedDocument,
      message: "Document updated successfully",
    })
  } catch (error) {
    console.error("Error updating document:", error)
    return NextResponse.json({ success: false, message: "Error updating document" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const documentId = parseInt(params.id)
    
    if (isNaN(documentId)) {
      return NextResponse.json({ success: false, message: "Invalid document ID" }, { status: 400 })
    }

    // Check if document exists
    const existingDocument = await prisma.document.findUnique({
      where: { id: documentId }
    })

    if (!existingDocument) {
      return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 })
    }

    // Delete document
    await prisma.document.delete({
      where: { id: documentId }
    })

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json({ success: false, message: "Error deleting document" }, { status: 500 })
  }
}