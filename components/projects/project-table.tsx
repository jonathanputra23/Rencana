"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Link from "next/link"

// Sample project data
const projects = [
  {
    id: "PRJ-001",
    title: "Web App Development",
    key: "WAD",
    description: "Frontend and backend development for the customer portal",
    status: "In Progress",
    progress: 65,
    dueDate: "Apr 28, 2023",
    members: 5,
    tasks: {
      total: 24,
      completed: 15,
    },
    pic: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
  },
  {
    id: "PRJ-002",
    title: "Mobile App Development",
    key: "MAD",
    description: "iOS and Android applications with shared codebase",
    status: "In Progress",
    progress: 40,
    dueDate: "May 15, 2023",
    members: 4,
    tasks: {
      total: 18,
      completed: 7,
    },
    pic: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
  },
  {
    id: "PRJ-003",
    title: "API Development",
    key: "API",
    description: "RESTful API services for internal and external use",
    status: "In Progress",
    progress: 80,
    dueDate: "Apr 20, 2023",
    members: 3,
    tasks: {
      total: 12,
      completed: 9,
    },
    pic: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DC",
    },
  },
  {
    id: "PRJ-004",
    title: "Database Migration",
    key: "DBM",
    description: "Migrate from legacy database to new cloud infrastructure",
    status: "Planning",
    progress: 15,
    dueDate: "Jun 10, 2023",
    members: 3,
    tasks: {
      total: 8,
      completed: 1,
    },
    pic: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
  },
  {
    id: "PRJ-005",
    title: "DevOps Pipeline",
    key: "DEV",
    description: "Set up CI/CD pipeline for automated testing and deployment",
    status: "In Progress",
    progress: 50,
    dueDate: "May 5, 2023",
    members: 2,
    tasks: {
      total: 10,
      completed: 5,
    },
    pic: {
      name: "Michael Wong",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
  },
]

export function ProjectTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">
              <div className="flex items-center">
                Key
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Summary
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center">
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[120px]">
              <div className="flex items-center">
                Due Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[120px]">Progress</TableHead>
            <TableHead className="w-[120px]">PIC</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{project.key}</TableCell>
              <TableCell>
                <Link
                  href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:underline font-medium"
                >
                  {project.title}
                </Link>
                <p className="text-sm text-muted-foreground truncate max-w-[300px]">{project.description}</p>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "default"
                      : project.status === "In Progress"
                        ? "secondary"
                        : project.status === "Planning"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.dueDate}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="h-2 w-[80px]" />
                  <span className="text-xs">{project.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.pic.avatar || "/placeholder.svg"} alt={project.pic.name} />
                    <AvatarFallback>{project.pic.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs truncate max-w-[80px]">{project.pic.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
