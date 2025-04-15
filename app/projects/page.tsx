"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, Search, List, Grid } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectTable } from "@/components/projects/project-table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "archived">("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [filter])

  async function fetchProjects() {
    let statusFilter: string | null = null
    if (filter === "active") statusFilter = "In Progress"
    else if (filter === "completed") statusFilter = "Completed"
    else if (filter === "archived") statusFilter = "Archived"

    const queryParams = new URLSearchParams()
    if (statusFilter) queryParams.append("status", statusFilter)

    const res = await fetch(`/api/v1/projects?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_TOKEN}`,
      },
    })
    if (res.ok) {
      const response = await res.json()
      setProjects(response.data || [])
    }
  }

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // State for dialog
  const [open, setOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDesc, setNewProjectDesc] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  async function handleCreateProject(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError("")
    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDesc,
        }),
      })
      if (!res.ok) {
        setError("Failed to create project")
        setCreating(false)
        return
      }
      setNewProjectName("")
      setNewProjectDesc("")
      setOpen(false)
      fetchProjects()
    } catch (err) {
      setError("Failed to create project")
    }
    setCreating(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <DashboardHeader />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Project</DialogTitle>
                  <DialogDescription>
                    Enter the project name and description.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <Input
                    placeholder="Project Name"
                    value={newProjectName}
                    onChange={e => setNewProjectName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Description"
                    value={newProjectDesc}
                    onChange={e => setNewProjectDesc(e.target.value)}
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={creating}>
                      {creating ? "Creating..." : "Create"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={(value: string) => setFilter(value as "all" | "active" | "completed" | "archived")} className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-4">
            {viewType === "grid" ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.name}
                    description={project.description}
                    status={project.status}
                    progress={Math.round(
                      project.tasks.total > 0
                        ? (project.tasks.completed / project.tasks.total) * 100
                        : 0
                    )}
                    dueDate={new Date(project.updatedAt).toLocaleDateString()}
                    members={project.tasks.total}
                    tasks={project.tasks}
                  />
                ))}
                <Card className="flex flex-col items-center justify-center p-6 h-full border-dashed">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Create a new project</p>
                </Card>
              </div>
            ) : (
              <div>No list view implemented yet</div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4 gap-2">
          <Button variant={viewType === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewType("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewType === "list" ? "default" : "outline"} size="sm" onClick={() => setViewType("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}

function ProjectViewToggle() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant={viewType === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewType("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewType === "list" ? "default" : "outline"} size="sm" onClick={() => setViewType("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewType === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="Web App Development"
            description="Frontend and backend development for the customer portal"
            status="In Progress"
            progress={65}
            dueDate="Apr 28, 2023"
            members={5}
            tasks={{
              total: 24,
              completed: 15,
            }}
          />
          <ProjectCard
            title="Mobile App Development"
            description="iOS and Android applications with shared codebase"
            status="In Progress"
            progress={40}
            dueDate="May 15, 2023"
            members={4}
            tasks={{
              total: 18,
              completed: 7,
            }}
          />
          <ProjectCard
            title="API Development"
            description="RESTful API services for internal and external use"
            status="In Progress"
            progress={80}
            dueDate="Apr 20, 2023"
            members={3}
            tasks={{
              total: 12,
              completed: 9,
            }}
          />
          <ProjectCard
            title="Database Migration"
            description="Migrate from legacy database to new cloud infrastructure"
            status="Planning"
            progress={15}
            dueDate="Jun 10, 2023"
            members={3}
            tasks={{
              total: 8,
              completed: 1,
            }}
          />
          <ProjectCard
            title="DevOps Pipeline"
            description="Set up CI/CD pipeline for automated testing and deployment"
            status="In Progress"
            progress={50}
            dueDate="May 5, 2023"
            members={2}
            tasks={{
              total: 10,
              completed: 5,
            }}
          />
          <Card className="flex flex-col items-center justify-center p-6 h-full border-dashed">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Create a new project</p>
          </Card>
        </div>
      ) : (
        <ProjectTable />
      )}
    </div>
  )
}
