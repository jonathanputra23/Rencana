"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter } from "lucide-react"
import { TaskList } from "@/components/tasks/task-list"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all")
  const [searchTerm, setSearchTerm] = useState("")

  // New Task dialog state
  const [open, setOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDesc, setNewTaskDesc] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [filter])

  async function fetchTasks() {
    const queryParams = new URLSearchParams()
    if (filter !== "all") queryParams.append("status", filter)

    const res = await fetch(`/api/v1/tasks?${queryParams.toString()}`)
    if (res.ok) {
      const data = await res.json()
      setTasks(data)
    }
  }

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError("")
    try {
      const res = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDesc,
        }),
      })
      if (!res.ok) {
        setError("Failed to create task")
        setCreating(false)
        return
      }
      setNewTaskTitle("")
      setNewTaskDesc("")
      setOpen(false)
      fetchTasks()
    } catch (err) {
      setError("Failed to create task")
    }
    setCreating(false)
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>TaskFlow</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
              Projects
            </Link>
            <Link href="/boards" className="text-sm font-medium hover:underline underline-offset-4">
              Boards
            </Link>
            <Link href="/tasks" className="text-sm font-medium underline underline-offset-4">
              My Tasks
            </Link>
            <Link href="/calendar" className="text-sm font-medium hover:underline underline-offset-4">
              Calendar
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Task</DialogTitle>
                  <DialogDescription>
                    Enter the task title and description.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-4">
                  <Input
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Description"
                    value={newTaskDesc}
                    onChange={e => setNewTaskDesc(e.target.value)}
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

        <Tabs defaultValue="all" onValueChange={(value: string) => setFilter(value as "all" | "today" | "upcoming" | "completed")} className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="today">Due Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{filter === "all" ? "All Tasks" : filter === "today" ? "Due Today" : filter === "upcoming" ? "Upcoming Tasks" : "Completed Tasks"}</CardTitle>
                <CardDescription>View and manage your tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList filter={filter} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
