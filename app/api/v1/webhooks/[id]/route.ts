import { NextResponse } from "next/server"

// Sample webhook registrations
const webhookRegistrations = [
  {
    id: "webhook-1",
    url: "https://example.com/webhook",
    events: ["task.created", "task.updated", "task.deleted"],
    secret: "webhook-secret-1",
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-04-10T14:30:00Z",
  },
  {
    id: "webhook-2",
    url: "https://another-example.com/webhook",
    events: ["project.created", "project.updated", "project.deleted"],
    secret: "webhook-secret-2",
    createdAt: "2023-03-20T09:00:00Z",
    updatedAt: "2023-03-20T09:00:00Z",
  },
]

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const webhook = webhookRegistrations.find((w) => w.id === params.id)

    if (!webhook) {
      return NextResponse.json({ success: false, message: "Webhook not found" }, { status: 404 })
    }

    // Remove sensitive information
    const { secret, ...sanitizedWebhook } = webhook

    return NextResponse.json({ success: true, data: sanitizedWebhook })
  } catch (error) {
    console.error("Error fetching webhook:", error)
    return NextResponse.json({ success: false, message: "Error fetching webhook" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const webhookIndex = webhookRegistrations.findIndex((w) => w.id === params.id)

    if (webhookIndex === -1) {
      return NextResponse.json({ success: false, message: "Webhook not found" }, { status: 404 })
    }

    const body = await req.json()

    // Validate event types if provided
    if (body.events) {
      const validEvents = [
        "task.created",
        "task.updated",
        "task.deleted",
        "project.created",
        "project.updated",
        "project.deleted",
        "comment.created",
        "comment.updated",
        "comment.deleted",
        "user.created",
        "user.updated",
        "user.deleted",
      ]

      const invalidEvents = body.events.filter((event: string) => !validEvents.includes(event))
      if (invalidEvents.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid event types: ${invalidEvents.join(", ")}`,
            validEvents,
          },
          { status: 400 },
        )
      }
    }

    // Update webhook
    const updatedWebhook = {
      ...webhookRegistrations[webhookIndex],
      url: body.url || webhookRegistrations[webhookIndex].url,
      events: body.events || webhookRegistrations[webhookIndex].events,
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would update this in a database
    // For this example, we'll just return the updated webhook

    // Remove sensitive information
    const { secret, ...sanitizedWebhook } = updatedWebhook

    return NextResponse.json({
      success: true,
      data: sanitizedWebhook,
      message: "Webhook updated successfully",
    })
  } catch (error) {
    console.error("Error updating webhook:", error)
    return NextResponse.json({ success: false, message: "Error updating webhook" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const webhookIndex = webhookRegistrations.findIndex((w) => w.id === params.id)

    if (webhookIndex === -1) {
      return NextResponse.json({ success: false, message: "Webhook not found" }, { status: 404 })
    }

    // In a real app, you would delete this from a database
    // For this example, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: "Webhook deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting webhook:", error)
    return NextResponse.json({ success: false, message: "Error deleting webhook" }, { status: 500 })
  }
}
