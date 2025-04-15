import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  status: "Planning" | "In Progress" | "Completed" | "Archived"
  progress: number
  dueDate: string
  members: number
  tasks: {
    total: number
    completed: number
  }
}

export function ProjectCard({ title, description, status, progress, dueDate, members, tasks }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge
            variant={
              status === "Completed"
                ? "default"
                : status === "In Progress"
                  ? "secondary"
                  : status === "Planning"
                    ? "outline"
                    : "secondary"
            }
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Due: {dueDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{members} members</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Tasks: {tasks.completed}/{tasks.total}
            </span>
            <span className="text-muted-foreground">{Math.round((tasks.completed / tasks.total) * 100)}% complete</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/projects/${title.toLowerCase().replace(/\s+/g, "-")}`}>View Project</Link>
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
