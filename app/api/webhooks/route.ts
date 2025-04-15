import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Log the webhook payload for debugging
    console.log("Webhook received:", body)

    // Process the webhook based on the event type
    const eventType = body.event || body.type || body.action

    switch (eventType) {
      case "task.created":
        // Handle task creation event
        console.log("Task created:", body.data)
        break
      case "task.updated":
        // Handle task update event
        console.log("Task updated:", body.data)
        break
      case "task.deleted":
        // Handle task deletion event
        console.log("Task deleted:", body.data)
        break
      case "project.created":
        // Handle project creation event
        console.log("Project created:", body.data)
        break
      case "project.updated":
        // Handle project update event
        console.log("Project updated:", body.data)
        break
      case "project.deleted":
        // Handle project deletion event
        console.log("Project deleted:", body.data)
        break
      default:
        console.log("Unhandled event type:", eventType)
    }

    // Return a success response
    return NextResponse.json({ success: true, message: "Webhook processed successfully" })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ success: false, message: "Error processing webhook" }, { status: 500 })
  }
}
