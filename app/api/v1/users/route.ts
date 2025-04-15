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
  {
    id: "user-3",
    name: "David Chen",
    email: "david.chen@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DC",
    role: "member",
    department: "Engineering",
    position: "Backend Developer",
    skills: ["Node.js", "Python", "Databases"],
    projects: ["1", "3"],
    tasks: ["task-5"],
    createdAt: "2023-01-25T14:00:00Z",
    updatedAt: "2023-04-12T16:20:00Z",
  },
]

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const role = url.searchParams.get("role")
    const department = url.searchParams.get("department")
    const projectId = url.searchParams.get("projectId")

    // Filter users based on query parameters
    let filteredUsers = [...users]

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role.toLowerCase() === role.toLowerCase())
    }

    if (department) {
      filteredUsers = filteredUsers.filter((user) => user.department.toLowerCase() === department.toLowerCase())
    }

    if (projectId) {
      filteredUsers = filteredUsers.filter((user) => user.projects.includes(projectId))
    }

    // Remove sensitive information
    const sanitizedUsers = filteredUsers.map((user) => {
      const { email, ...rest } = user
      return rest
    })

    return NextResponse.json({
      success: true,
      data: sanitizedUsers,
      meta: {
        total: sanitizedUsers.length,
        page: 1,
        limit: 10,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, message: "Error fetching users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    // This endpoint would typically be restricted to admins
    // For this example, we'll just return an unauthorized error

    return NextResponse.json(
      { success: false, message: "Unauthorized. Only administrators can create users." },
      { status: 401 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, message: "Error creating user" }, { status: 500 })
  }
}
