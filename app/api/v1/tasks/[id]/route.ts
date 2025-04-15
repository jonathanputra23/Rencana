import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id)
    
    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, message: "Invalid task ID" }, { status: 400 })
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
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

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    // Format the response
    const formattedTask = {
      ...task,
      assignee: task.assignee ? {
        ...task.assignee,
        avatar: "/placeholder.svg?height=32&width=32",
        initials: task.assignee.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
      } : null,
      comments: 0,
      attachments: 0
    }

    return NextResponse.json({ success: true, data: formattedTask })
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ success: false, message: "Error fetching task" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id)
    
    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, message: "Invalid task ID" }, { status: 400 })
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!existingTask) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    const body = await req.json()

    // Validate assignee if provided
    let assigneeId = undefined
    if (body.assigneeId !== undefined) {
      if (body.assigneeId === null) {
        assigneeId = null
      } else {
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
    }

    // Parse due date if provided
    let dueDate = undefined
    if (body.dueDate !== undefined) {
      if (body.dueDate === null) {
        dueDate = null
      } else {
        dueDate = new Date(body.dueDate)
        if (isNaN(dueDate.getTime())) {
          return NextResponse.json({ success: false, message: "Invalid due date format" }, { status: 400 })
        }
      }
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        description: body.description !== undefined ? body.description : undefined,
        status: body.status !== undefined ? body.status : undefined,
        priority: body.priority !== undefined ? body.priority : undefined,
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
      ...updatedTask,
      assignee: updatedTask.assignee ? {
        ...updatedTask.assignee,
        avatar: "/placeholder.svg?height=32&width=32",
        initials: updatedTask.assignee.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
      } : null,
      comments: 0,
      attachments: 0
    }

    return NextResponse.json({
      success: true,
      data: formattedTask,
      message: "Task updated successfully",
    })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ success: false, message: "Error updating task" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = parseInt(params.id)
    
    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, message: "Invalid task ID" }, { status: 400 })
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!existingTask) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    // Delete task
    await prisma.task.delete({
      where: { id: taskId }
    })

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ success: false, message: "Error deleting task" }, { status: 500 })
  }
}
