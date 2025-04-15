import { NextResponse } from "next/server"

// Sample project data
const projects = [
  {
    id: "1",
    name: "Web App Development",
    description: "Frontend and backend development for the customer portal",
    status: "In Progress",
    progress: 65,
    startDate: "2023-03-01",
    endDate: "2023-04-28",
    members: [
      { id: "user-1", name: "Alex Johnson", role: "Frontend Developer" },
      { id: "user-2", name: "Sarah Miller", role: "UX Designer" },
      { id: "user-3", name: "David Chen", role: "Backend Developer" },
      { id: "user-4", name: "Emily Rodriguez", role: "QA Engineer" },
      { id: "user-5", name: "Michael Wong", role: "DevOps Engineer" },
    ],
    tasks: {
      total: 24,
      completed: 15,
    },
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android applications with shared codebase",
    status: "In Progress",
    progress: 40,
    startDate: "2023-03-15",
    endDate: "2023-05-15",
    members: [
      { id: "user-1", name: "Alex Johnson", role: "Frontend Developer" },
      { id: "user-4", name: "Emily Rodriguez", role: "QA Engineer" },
      { id: "user-6", name: "Jessica Taylor", role: "Product Manager" },
      { id: "user-7", name: "Robert Kim", role: "Mobile Developer" },
    ],
    tasks: {
      total: 18,
      completed: 7,
    },
  },
  {
    id: "3",
    name: "API Development",
    description: "RESTful API services for internal and external use",
    status: "In Progress",
    progress: 80,
    startDate: "2023-03-01",
    endDate: "2023-04-20",
    members: [
      { id: "user-3", name: "David Chen", role: "Backend Developer" },
      { id: "user-4", name: "Emily Rodriguez", role: "QA Engineer" },
      { id: "user-8", name: "Lisa Wang", role: "Backend Developer" },
    ],
    tasks: {
      total: 12,
      completed: 9,
    },
  },
]

export async function GET(req: Request) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status")
    const memberId = url.searchParams.get("memberId")

    // Filter projects based on query parameters
    let filteredProjects = [...projects]

    if (status) {
      filteredProjects = filteredProjects.filter((project) => project.status.toLowerCase() === status.toLowerCase())
    }

    if (memberId) {
      filteredProjects = filteredProjects.filter((project) => project.members.some((member) => member.id === memberId))
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      meta: {
        total: filteredProjects.length,
        page: 1,
        limit: 10,
      },
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ success: false, message: "Error fetching projects" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json({ success: false, message: "Name and description are required" }, { status: 400 })
    }

    // Create a new project
    const newProject = {
      id: `${projects.length + 1}`,
      name: body.name,
      description: body.description,
      status: body.status || "Planning",
      progress: body.progress || 0,
      startDate: body.startDate || new Date().toISOString().split("T")[0],
      endDate: body.endDate,
      members: body.members || [],
      tasks: {
        total: 0,
        completed: 0,
      },
    }

    // In a real app, you would save this to a database
    // For this example, we'll just return the new project

    return NextResponse.json(
      {
        success: true,
        data: newProject,
        message: "Project created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ success: false, message: "Error creating project" }, { status: 500 })
  }
}
