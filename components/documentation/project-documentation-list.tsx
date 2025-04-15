"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, FolderKanban, Smartphone, Database, Cpu, ChevronRight, ChevronDown, Plus } from "lucide-react"

// Project data with documentation categories
const projects = [
  {
    id: "web-app",
    name: "Web App",
    description: "Customer portal web application",
    icon: <FolderKanban className="h-5 w-5 text-blue-500" />,
    docsCount: 12,
    lastUpdated: "2 days ago",
    categories: [
      {
        name: "Initiation",
        documents: [
          { name: "Feasibility Report", path: "/documentation/projects/web-app/feasibility-report" },
          { name: "Stakeholder Map", path: "/documentation/projects/web-app/stakeholder-map" },
        ],
      },
      {
        name: "Planning",
        documents: [
          {
            name: "Business Requirements Document",
            path: "/documentation/projects/web-app/business-requirements-document",
          },
          {
            name: "Product Requirements Document",
            path: "/documentation/projects/web-app/product-requirements-document",
          },
          { name: "Risk Assessment", path: "/documentation/projects/web-app/risk-assessment" },
          { name: "Project Timeline", path: "/documentation/projects/web-app/project-timeline" },
        ],
      },
      {
        name: "Design & Development",
        documents: [
          { name: "Architecture Diagram", path: "/documentation/projects/web-app/architecture-diagram" },
          { name: "UI Mockups", path: "/documentation/projects/web-app/ui-mockups" },
          { name: "Development Breakdown", path: "/documentation/projects/web-app/development-breakdown" },
        ],
      },
      {
        name: "Testing & QA",
        documents: [
          { name: "Test Plan", path: "/documentation/projects/web-app/test-plan" },
          { name: "Bug Report Sheet", path: "/documentation/projects/web-app/bug-report-sheet" },
          { name: "UAT Checklist", path: "/documentation/projects/web-app/uat-checklist" },
          { name: "Security Testing Checklist", path: "/documentation/projects/web-app/security-testing-checklist" },
        ],
      },
      {
        name: "Deployment & Maintenance",
        documents: [
          { name: "Deployment Guide", path: "/documentation/projects/web-app/deployment-guide" },
          { name: "Release Notes", path: "/documentation/projects/web-app/release-notes" },
          { name: "Change Log", path: "/documentation/projects/web-app/change-log" },
        ],
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    description: "iOS and Android mobile application",
    icon: <Smartphone className="h-5 w-5 text-green-500" />,
    docsCount: 8,
    lastUpdated: "1 week ago",
    categories: [
      {
        name: "Initiation",
        documents: [
          { name: "Feasibility Report", path: "/documentation/projects/mobile-app/feasibility-report" },
          { name: "Stakeholder Map", path: "/documentation/projects/mobile-app/stakeholder-map" },
        ],
      },
      {
        name: "Planning",
        documents: [
          {
            name: "Business Requirements Document",
            path: "/documentation/projects/mobile-app/business-requirements-document",
          },
          {
            name: "Product Requirements Document",
            path: "/documentation/projects/mobile-app/product-requirements-document",
          },
        ],
      },
      {
        name: "Design & Development",
        documents: [
          { name: "Architecture Diagram", path: "/documentation/projects/mobile-app/architecture-diagram" },
          { name: "UI Mockups", path: "/documentation/projects/mobile-app/ui-mockups" },
        ],
      },
      {
        name: "Testing & QA",
        documents: [{ name: "Test Plan", path: "/documentation/projects/mobile-app/test-plan" }],
      },
      {
        name: "Deployment & Maintenance",
        documents: [{ name: "Deployment Guide", path: "/documentation/projects/mobile-app/deployment-guide" }],
      },
    ],
  },
  {
    id: "api",
    name: "API",
    description: "RESTful API services",
    icon: <Database className="h-5 w-5 text-purple-500" />,
    docsCount: 6,
    lastUpdated: "3 days ago",
    categories: [
      {
        name: "Initiation",
        documents: [{ name: "Feasibility Report", path: "/documentation/projects/api/feasibility-report" }],
      },
      {
        name: "Planning",
        documents: [
          {
            name: "Business Requirements Document",
            path: "/documentation/projects/api/business-requirements-document",
          },
          { name: "Product Requirements Document", path: "/documentation/projects/api/product-requirements-document" },
        ],
      },
      {
        name: "Design & Development",
        documents: [
          { name: "Architecture Diagram", path: "/documentation/projects/api/architecture-diagram" },
          { name: "API Specification", path: "/documentation/projects/api/api-specification" },
        ],
      },
      {
        name: "Testing & QA",
        documents: [{ name: "Test Plan", path: "/documentation/projects/api/test-plan" }],
      },
      {
        name: "Deployment & Maintenance",
        documents: [{ name: "Deployment Guide", path: "/documentation/projects/api/deployment-guide" }],
      },
    ],
  },
  {
    id: "iot-device",
    name: "IoT Device",
    description: "Smart home IoT device",
    icon: <Cpu className="h-5 w-5 text-orange-500" />,
    docsCount: 14,
    lastUpdated: "5 days ago",
    categories: [
      {
        name: "Initiation",
        documents: [
          { name: "Feasibility Report", path: "/documentation/projects/iot-device/feasibility-report" },
          { name: "Stakeholder Map", path: "/documentation/projects/iot-device/stakeholder-map" },
        ],
      },
      {
        name: "Planning",
        documents: [
          {
            name: "Business Requirements Document",
            path: "/documentation/projects/iot-device/business-requirements-document",
          },
          {
            name: "Product Requirements Document",
            path: "/documentation/projects/iot-device/product-requirements-document",
          },
          { name: "Risk Assessment", path: "/documentation/projects/iot-device/risk-assessment" },
          { name: "Project Timeline", path: "/documentation/projects/iot-device/project-timeline" },
        ],
      },
      {
        name: "Design & Development",
        documents: [
          { name: "Architecture Diagram", path: "/documentation/projects/iot-device/architecture-diagram" },
          { name: "Hardware Specifications", path: "/documentation/projects/iot-device/hardware-specifications" },
          { name: "Development Breakdown", path: "/documentation/projects/iot-device/development-breakdown" },
        ],
      },
      {
        name: "Testing & QA",
        documents: [
          { name: "Test Plan", path: "/documentation/projects/iot-device/test-plan" },
          { name: "Bug Report Sheet", path: "/documentation/projects/iot-device/bug-report-sheet" },
          { name: "UAT Checklist", path: "/documentation/projects/iot-device/uat-checklist" },
        ],
      },
      {
        name: "Deployment & Maintenance",
        documents: [
          { name: "Deployment Guide", path: "/documentation/projects/iot-device/deployment-guide" },
          { name: "Release Notes", path: "/documentation/projects/iot-device/release-notes" },
        ],
      },
      {
        name: "Hardware Documentation",
        documents: [
          { name: "Assembly Manual", path: "/documentation/projects/iot-device/assembly-manual" },
          { name: "Testing Manual", path: "/documentation/projects/iot-device/testing-manual" },
          { name: "FAT Checklist", path: "/documentation/projects/iot-device/fat-checklist" },
          { name: "SAT Checklist", path: "/documentation/projects/iot-device/sat-checklist" },
          { name: "Packaging Manual", path: "/documentation/projects/iot-device/packaging-manual" },
          { name: "Installation Manual", path: "/documentation/projects/iot-device/installation-manual" },
          { name: "User Manual", path: "/documentation/projects/iot-device/user-manual" },
          { name: "Product Brochure", path: "/documentation/projects/iot-device/product-brochure" },
          { name: "Product Presentation", path: "/documentation/projects/iot-device/product-presentation" },
        ],
      },
    ],
  },
]

export function ProjectDocumentationList() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: string[] }>({})

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleCategory = (projectId: string, categoryName: string) => {
    setExpandedCategories((prev) => {
      const projectCategories = prev[projectId] || []
      return {
        ...prev,
        [projectId]: projectCategories.includes(categoryName)
          ? projectCategories.filter((name) => name !== categoryName)
          : [...projectCategories, categoryName],
      }
    })
  }

  const isProjectExpanded = (projectId: string) => expandedProjects.includes(projectId)

  const isCategoryExpanded = (projectId: string, categoryName: string) => {
    return (expandedCategories[projectId] || []).includes(categoryName)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleProject(project.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {project.icon}
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="outline">{project.docsCount} docs</Badge>
                    </div>
                    {isProjectExpanded(project.id) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                {isProjectExpanded(project.id) && (
                  <CardContent>
                    <div className="space-y-4">
                      {project.categories.map((category) => (
                        <div key={`${project.id}-${category.name}`} className="space-y-2">
                          <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => toggleCategory(project.id, category.name)}
                          >
                            {isCategoryExpanded(project.id, category.name) ? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h3 className="font-medium">{category.name}</h3>
                          </div>

                          {isCategoryExpanded(project.id, category.name) && (
                            <div className="ml-6 space-y-1">
                              {category.documents.map((doc) => (
                                <div key={doc.path} className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <Link href={doc.path} className="text-sm hover:underline">
                                    {doc.name}
                                  </Link>
                                </div>
                              ))}
                              <Button variant="ghost" size="sm" className="mt-2">
                                <Plus className="mr-2 h-3 w-3" />
                                Add Document
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="space-y-4">
            {projects
              .sort((a, b) => {
                // Sort by last updated date (most recent first)
                const aTime = a.lastUpdated.includes("day") ? Number.parseInt(a.lastUpdated.split(" ")[0]) : 0
                const bTime = b.lastUpdated.includes("day") ? Number.parseInt(b.lastUpdated.split(" ")[0]) : 0
                return bTime - aTime
              })
              .map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleProject(project.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {project.icon}
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant="outline">{project.docsCount} docs</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Updated {project.lastUpdated}</span>
                        {isProjectExpanded(project.id) ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  {isProjectExpanded(project.id) && (
                    <CardContent>
                      <div className="space-y-4">
                        {project.categories.map((category) => (
                          <div key={`${project.id}-${category.name}`} className="space-y-2">
                            <div
                              className="flex items-center space-x-2 cursor-pointer"
                              onClick={() => toggleCategory(project.id, category.name)}
                            >
                              {isCategoryExpanded(project.id, category.name) ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                              <h3 className="font-medium">{category.name}</h3>
                            </div>

                            {isCategoryExpanded(project.id, category.name) && (
                              <div className="ml-6 space-y-1">
                                {category.documents.map((doc) => (
                                  <div key={doc.path} className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <Link href={doc.path} className="text-sm hover:underline">
                                      {doc.name}
                                    </Link>
                                  </div>
                                ))}
                                <Button variant="ghost" size="sm" className="mt-2">
                                  <Plus className="mr-2 h-3 w-3" />
                                  Add Document
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No favorite projects yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
