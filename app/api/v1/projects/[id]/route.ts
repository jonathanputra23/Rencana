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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: project })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ success: false, message: "Error fetching project" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    const body = await req.json()

    // Update project
    const updatedProject = {
      ...projects[projectIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
    }

    // In a real app, you would update this in a database
    // For this example, we'll just return the updated project

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ success: false, message: "Error updating project" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const projectIndex = projects.findIndex((p) => p.id === params.id)

    if (projectIndex === -1) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 })
    }

    // In a real app, you would delete this from a database
    // For this example, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ success: false, message: "Error deleting project" }, { status: 500 })
  }
}
