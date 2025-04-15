import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const notificationId = parseInt(params.id)
    
    if (isNaN(notificationId)) {
      return NextResponse.json({ success: false, message: "Invalid notification ID" }, { status: 400 })
    }

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
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

    if (!notification) {
      return NextResponse.json({ success: false, message: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: notification })
  } catch (error) {
    console.error("Error fetching notification:", error)
    return NextResponse.json({ success: false, message: "Error fetching notification" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const notificationId = parseInt(params.id)
    
    if (isNaN(notificationId)) {
      return NextResponse.json({ success: false, message: "Invalid notification ID" }, { status: 400 })
    }

    // Check if notification exists
    const existingNotification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!existingNotification) {
      return NextResponse.json({ success: false, message: "Notification not found" }, { status: 404 })
    }

    const body = await req.json()

    // Update notification
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        status: body.status !== undefined ? body.status : undefined,
        type: body.type !== undefined ? body.type : undefined
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

    return NextResponse.json({
      success: true,
      data: updatedNotification,
      message: "Notification updated successfully",
    })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ success: false, message: "Error updating notification" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const notificationId = parseInt(params.id)
    
    if (isNaN(notificationId)) {
      return NextResponse.json({ success: false, message: "Invalid notification ID" }, { status: 400 })
    }

    // Check if notification exists
    const existingNotification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!existingNotification) {
      return NextResponse.json({ success: false, message: "Notification not found" }, { status: 404 })
    }

    // Delete notification
    await prisma.notification.delete({
      where: { id: notificationId }
    })

    return NextResponse.json({
      success: true,
      message: "Notification deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting notification:", error)
    return NextResponse.json({ success: false, message: "Error deleting notification" }, { status: 500 })
  }
}