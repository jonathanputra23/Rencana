"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ArrowUpDown, Filter } from "lucide-react"

const resourceData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    department: "Engineering",
    utilization: 85,
    availability: "Available",
    projects: ["Web App", "Mobile App"],
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SM",
    department: "Design",
    utilization: 70,
    availability: "Available",
    projects: ["Web App", "Marketing Site"],
  },
  {
    id: 3,
    name: "David Chen",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DC",
    department: "Engineering",
    utilization: 95,
    availability: "Overallocated",
    projects: ["API", "Database Migration"],
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ER",
    department: "Quality Assurance",
    utilization: 65,
    availability: "Available",
    projects: ["Web App", "Mobile App", "API"],
  },
  {
    id: 5,
    name: "Michael Wong",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MW",
    department: "Operations",
    utilization: 80,
    availability: "Limited",
    projects: ["DevOps Pipeline", "Infrastructure"],
  },
  {
    id: 6,
    name: "Jessica Taylor",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JT",
    department: "Product",
    utilization: 75,
    availability: "Available",
    projects: ["Web App", "Mobile App", "Marketing Site"],
  },
  {
    id: 7,
    name: "Robert Kim",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "RK",
    department: "Data",
    utilization: 90,
    availability: "Limited",
    projects: ["Analytics Platform", "Data Pipeline"],
  },
  {
    id: 8,
    name: "Lisa Wang",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "LW",
    department: "Engineering",
    utilization: 60,
    availability: "Available",
    projects: ["Marketing Site", "Customer Portal"],
  },
]

export function ResourceUtilizationTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = resourceData.filter(
    (resource) =>
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.projects.some((project) => project.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === "utilization") {
      return sortDirection === "asc" ? a.utilization - b.utilization : b.utilization - a.utilization
    }

    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="w-full sm:w-[300px] pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Resource
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("department")}>
                  Department
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("utilization")}>
                  Utilization
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("availability")}>
                  Availability
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Projects</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={resource.avatar || "/placeholder.svg"} alt={resource.name} />
                      <AvatarFallback>{resource.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{resource.name}</div>
                      <div className="text-xs text-muted-foreground">{resource.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{resource.department}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span
                        className={
                          resource.utilization > 90
                            ? "text-red-500 font-medium"
                            : resource.utilization > 80
                              ? "text-orange-500 font-medium"
                              : "text-green-500 font-medium"
                        }
                      >
                        {resource.utilization}%
                      </span>
                    </div>
                    <Progress
                      value={resource.utilization}
                      className="h-2"
                      indicatorClassName={
                        resource.utilization > 90
                          ? "bg-red-500"
                          : resource.utilization > 80
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      resource.availability === "Overallocated"
                        ? "destructive"
                        : resource.availability === "Limited"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {resource.availability}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {resource.projects.map((project, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
