"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, List, Grid } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectTable } from "@/components/projects/project-table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useState } from "react"

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <DashboardHeader />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search projects..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        <ProjectViewToggle />
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
