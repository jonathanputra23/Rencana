import { NextResponse } from "next/server"

// Sample user data
const users = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    role: "admin",
    department: "Engineering",
    position: "Frontend Developer",
    skills: ["React", "TypeScript", "UI/UX"],
    projects: ["1", "2"],
    tasks: ["task-1", "task-3"],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-04-10T14:30:00Z",
  },
  {
    id: "user-2",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SM",
    role: "member",
    department: "Design",
    position: "UX Designer",
    skills: ["Figma", "User Research", "Prototyping"],
    projects: ["1"],
    tasks: ["task-2", "task-8"],
    createdAt: "2023-01-20T09:00:00Z",
    updatedAt: "2023-04-18T11:45:00Z",
  },
]

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = users.find((u) => u.id === params.id)

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Remove sensitive information
    const { email, ...sanitizedUser } = user

    return NextResponse.json({ success: true, data: sanitizedUser })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ success: false, message: "Error fetching user" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    // This endpoint would typically be restricted to admins or the user themselves
    // For this example, we'll just return an unauthorized error

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized. Only administrators or the user themselves can update user information.",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ success: false, message: "Error updating user" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // This endpoint would typically be restricted to admins
    // For this example, we'll just return an unauthorized error

    return NextResponse.json(
      { success: false, message: "Unauthorized. Only administrators can delete users." },
      { status: 401 },
    )
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, message: "Error deleting user" }, { status: 500 })
  }
}
