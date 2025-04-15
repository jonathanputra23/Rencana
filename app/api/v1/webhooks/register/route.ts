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

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.url || !body.events || !Array.isArray(body.events) || body.events.length === 0) {
      return NextResponse.json({ success: false, message: "URL and at least one event are required" }, { status: 400 })
    }

    // Validate event types
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

    // Generate a webhook secret
    const secret = `whsec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    // Create a new webhook registration
    const newWebhook = {
      id: `webhook-${webhookRegistrations.length + 1}`,
      url: body.url,
      events: body.events,
      secret,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    // For this example, we'll just return the new webhook registration

    return NextResponse.json(
      {
        success: true,
        data: newWebhook,
        message: "Webhook registered successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering webhook:", error)
    return NextResponse.json({ success: false, message: "Error registering webhook" }, { status: 500 })
  }
}
