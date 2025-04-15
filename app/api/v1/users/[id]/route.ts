import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Format the response
    const initials = user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
    
    // Get unique project IDs from tasks
    const projectIds = [...new Set(user.tasks.map((task: any) => task.project.id))]
    
    const formattedUser = {
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

    return NextResponse.json({ success: true, data: formattedUser })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ success: false, message: "Error fetching user" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // In a real app, this would be protected by authentication middleware
    // For now, we'll implement the functionality
    
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    const body = await req.json()

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        email: body.email !== undefined ? body.email : undefined,
        role: body.role !== undefined ? body.role : undefined,
        telegram_id: body.telegram_id !== undefined ? body.telegram_id : undefined
      },
      include: {
        tasks: {
          select: {
            id: true,
            project: {
              select: {
                id: true
              }
            }
          }
        }
      }
    })

    // Format the response
    const initials = updatedUser.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
    
    // Get unique project IDs from tasks
    const projectIds = [...new Set(updatedUser.tasks.map((task: any) => task.project.id))]
    
    const formattedUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      avatar: "/placeholder.svg?height=32&width=32",
      initials,
      role: updatedUser.role,
      telegram_id: updatedUser.telegram_id,
      tasks: updatedUser.tasks.map((task: any) => task.id),
      projects: projectIds,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }

    return NextResponse.json({
      success: true,
      data: formattedUser,
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ success: false, message: "Error updating user" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // In a real app, this would be protected by authentication middleware
    // For now, we'll implement the functionality
    
    const userId = parseInt(params.id)
    
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: "Invalid user ID" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check if user has assigned tasks
    const userTasks = await prisma.task.findMany({
      where: { assigneeId: userId }
    })

    if (userTasks.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Cannot delete user with assigned tasks. Reassign or delete the tasks first."
      }, { status: 400 })
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, message: "Error deleting user" }, { status: 500 })
  }
}
