"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GanttChart } from "@/components/calendar/gantt-chart"

export default function CalendarPage() {
  const [view, setView] = useState<"today" | "week" | "month">("today")
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    fetchTasks()
  }, [view])

  async function fetchTasks() {
    // For simplicity, fetch all tasks; in real app, filter by view
    const res = await fetch("/api/v1/tasks")
    if (res.ok) {
      const data = await res.json()
      setTasks(data)
    }
  }

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
            <Link href="/tasks" className="text-sm font-medium hover:underline underline-offset-4">
              My Tasks
            </Link>
            <Link href="/calendar" className="text-sm font-medium underline underline-offset-4">
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
          <h1 className="text-2xl font-bold">Project Timeline</h1>
          <div className="flex items-center gap-2">
            <Button variant={view === "today" ? "default" : "outline"} onClick={() => setView("today")}>Today</Button>
            <Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")}>Week</Button>
            <Button variant={view === "month" ? "default" : "outline"} onClick={() => setView("month")}>Month</Button>
          </div>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Project timeline and task dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <GanttChart />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
