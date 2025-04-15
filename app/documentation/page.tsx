"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"
import { ProjectDocumentationList } from "@/components/documentation/project-documentation-list"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"

export default function DocumentationPage() {
  // Dialog state
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
      const res = await fetch("/api/v1/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDesc,
        }),
      })
      if (!res.ok) {
        setError("Failed to create documentation project")
        setCreating(false)
        return
      }
      setNewProjectName("")
      setNewProjectDesc("")
      setOpen(false)
      // Optionally, refresh documentation list here
    } catch (err) {
      setError("Failed to create documentation project")
    }
    setCreating(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">Project documentation and templates</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search documentation..." className="pl-8 w-full md:w-[300px]" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Documentation Project</DialogTitle>
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

        <div className="space-y-6">
          <ProjectDocumentationList />

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "API Documentation",
                  project: "Web App",
                  category: "Development",
                  updatedAt: "2 hours ago",
                  updatedBy: "Admin",
                },
                {
                  title: "User Manual",
                  project: "Mobile App",
                  category: "User Guide",
                  updatedAt: "Yesterday",
                  updatedBy: "Admin",
                },
                {
                  title: "Deployment Guide",
                  project: "API",
                  category: "Deployment",
                  updatedAt: "3 days ago",
                  updatedBy: "Admin",
                },
                {
                  title: "Product Requirements Document",
                  project: "Web App",
                  category: "Planning",
                  updatedAt: "1 week ago",
                  updatedBy: "Admin",
                },
                {
                  title: "Security Test Checklist",
                  project: "API",
                  category: "Testing",
                  updatedAt: "2 weeks ago",
                  updatedBy: "Admin",
                },
                {
                  title: "Product Brochure",
                  project: "IoT Device",
                  category: "Marketing",
                  updatedAt: "3 weeks ago",
                  updatedBy: "Admin",
                },
              ].map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <Badge variant="outline">{doc.category}</Badge>
                    </div>
                    <CardDescription>Project: {doc.project}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Updated {doc.updatedAt} by {doc.updatedBy}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/documentation/projects/${doc.project.toLowerCase().replace(/\s+/g, "-")}/${doc.title.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          View Document
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
