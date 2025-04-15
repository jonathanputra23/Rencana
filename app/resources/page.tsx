import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResourceAllocationChart } from "@/components/resources/resource-allocation-chart"
import { ResourceCapacityChart } from "@/components/resources/resource-capacity-chart"
import { ResourceUtilizationTable } from "@/components/resources/resource-utilization-table"

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Resource Management</h1>
            <p className="text-muted-foreground">Manage team workload and resource allocation</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Export Report</Button>
            <Button>Manage Resources</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overallocated Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground text-red-500">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="allocation" className="mt-6">
          <TabsList>
            <TabsTrigger value="allocation">Resource Allocation</TabsTrigger>
            <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
          </TabsList>
          <TabsContent value="allocation" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Current allocation of resources across projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourceAllocationChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="capacity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Planning</CardTitle>
                <CardDescription>Resource capacity vs. allocation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourceCapacityChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="utilization" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Detailed breakdown of resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourceUtilizationTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Matrix</CardTitle>
                <CardDescription>Team skills and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Frontend Development",
                      skills: [
                        { name: "React", level: 85 },
                        { name: "Vue", level: 60 },
                        { name: "Angular", level: 45 },
                        { name: "TypeScript", level: 75 },
                      ],
                    },
                    {
                      name: "Backend Development",
                      skills: [
                        { name: "Node.js", level: 80 },
                        { name: "Python", level: 70 },
                        { name: "Java", level: 65 },
                        { name: "Go", level: 40 },
                      ],
                    },
                    {
                      name: "DevOps",
                      skills: [
                        { name: "Docker", level: 75 },
                        { name: "Kubernetes", level: 60 },
                        { name: "AWS", level: 70 },
                        { name: "CI/CD", level: 80 },
                      ],
                    },
                    {
                      name: "Design",
                      skills: [
                        { name: "UI Design", level: 85 },
                        { name: "UX Research", level: 70 },
                        { name: "Figma", level: 90 },
                        { name: "Design Systems", level: 75 },
                      ],
                    },
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">{category.name}</h3>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Team Members</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Johnson",
                role: "Frontend Developer",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "AJ",
                utilization: 85,
                skills: ["React", "TypeScript", "UI/UX"],
                projects: ["Web App", "Mobile App"],
              },
              {
                name: "Sarah Miller",
                role: "UX Designer",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "SM",
                utilization: 70,
                skills: ["Figma", "User Research", "Prototyping"],
                projects: ["Web App", "Marketing Site"],
              },
              {
                name: "David Chen",
                role: "Backend Developer",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "DC",
                utilization: 95,
                skills: ["Node.js", "Python", "Databases"],
                projects: ["API", "Database Migration"],
              },
              {
                name: "Emily Rodriguez",
                role: "QA Engineer",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "ER",
                utilization: 65,
                skills: ["Test Automation", "Manual Testing", "QA Process"],
                projects: ["Web App", "Mobile App", "API"],
              },
              {
                name: "Michael Wong",
                role: "DevOps Engineer",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "MW",
                utilization: 80,
                skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
                projects: ["DevOps Pipeline", "Infrastructure"],
              },
              {
                name: "Jessica Taylor",
                role: "Product Manager",
                avatar: "/placeholder.svg?height=64&width=64",
                initials: "JT",
                utilization: 75,
                skills: ["Product Strategy", "Roadmapping", "User Stories"],
                projects: ["Web App", "Mobile App", "Marketing Site"],
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Utilization</span>
                      <span
                        className={
                          member.utilization > 90
                            ? "text-red-500 font-medium"
                            : member.utilization > 80
                              ? "text-orange-500 font-medium"
                              : "text-green-500 font-medium"
                        }
                      >
                        {member.utilization}%
                      </span>
                    </div>
                    <Progress
                      value={member.utilization}
                      className="h-2"
                      indicatorClassName={
                        member.utilization > 90
                          ? "bg-red-500"
                          : member.utilization > 80
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }
                    />
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Projects</p>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((project, projectIndex) => (
                          <Badge key={projectIndex} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/resources/${member.name.toLowerCase().replace(/\s+/g, "-")}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
