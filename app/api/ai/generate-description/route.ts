import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Task title is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a detailed task description for a project management task with the title: "${title}". 
      The description should be 2-3 sentences long, professional in tone, and include specific details about what needs to be done.
      Do not include any prefixes like "Description:" or similar.`,
    })

    return NextResponse.json({ description: text.trim() })
  } catch (error) {
    console.error("Error generating task description:", error)
    return NextResponse.json({ error: "Failed to generate task description" }, { status: 500 })
  }
}
