"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function TaskGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [projectDescription, setProjectDescription] = useState("")
  const [generatedTasks, setGeneratedTasks] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate API call to generate tasks
    setTimeout(() => {
      const tasks = [
        {
          title: "Set up project repository",
          description: "Create a new Git repository and set up the initial project structure",
          priority: "High",
          estimatedTime: "2 hours",
        },
        {
          title: "Define database schema",
          description: "Design and document the database schema for the application",
          priority: "High",
          estimatedTime: "4 hours",
        },
        {
          title: "Create wireframes for UI",
          description: "Design wireframes for the main user interfaces",
          priority: "Medium",
          estimatedTime: "6 hours",
        },
        {
          title: "Set up authentication system",
          description: "Implement user authentication and authorization",
          priority: "High",
          estimatedTime: "8 hours",
        },
        {
          title: "Implement API endpoints",
          description: "Create RESTful API endpoints for the core functionality",
          priority: "Medium",
          estimatedTime: "12 hours",
        },
        {
          title: "Write unit tests",
          description: "Create unit tests for the core components",
          priority: "Medium",
          estimatedTime: "6 hours",
        },
        {
          title: "Set up CI/CD pipeline",
          description: "Configure continuous integration and deployment",
          priority: "Low",
          estimatedTime: "4 hours",
        },
      ]

      setGeneratedTasks(tasks)
      setIsGenerating(false)
    }, 2000)
  }

  const handleAddTasks = () => {
    // In a real app, you would add these tasks to your project
    setIsDialogOpen(false)
    // Reset for next use
    setGeneratedTasks([])
    setProjectDescription("")
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Tasks with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate Tasks with AI</DialogTitle>
          <DialogDescription>Describe your project and let AI suggest tasks to help you get started.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe your project in detail..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !projectDescription.trim()} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Tasks...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Tasks
              </>
            )}
          </Button>

          {generatedTasks.length > 0 && (
            <div className="space-y-4 mt-4">
              <h3 className="text-sm font-medium">Generated Tasks</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {generatedTasks.map((task, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTasks} disabled={generatedTasks.length === 0}>
            Add Tasks to Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
