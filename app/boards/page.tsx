import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"
import { KanbanBoard } from "@/components/boards/kanban-board"

export default function BoardsPage() {
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
            <Link href="/boards" className="text-sm font-medium underline underline-offset-4">
              Boards
            </Link>
            <Link href="/tasks" className="text-sm font-medium hover:underline underline-offset-4">
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
          <h1 className="text-2xl font-bold">Boards</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search boards..." className="w-[200px] pl-8 md:w-[300px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Board
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">All Boards</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>Web App Development</CardTitle>
                  <CardDescription>Frontend and backend tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">24 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/web-app">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>Mobile App Development</CardTitle>
                  <CardDescription>iOS and Android tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">18 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/mobile-app">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 1 day ago</span>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>API Development</CardTitle>
                  <CardDescription>Backend API tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">12 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/api">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 3 days ago</span>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>Web App Development</CardTitle>
                  <CardDescription>Frontend and backend tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">24 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/web-app">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>Mobile App Development</CardTitle>
                  <CardDescription>iOS and Android tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">18 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/mobile-app">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 1 day ago</span>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>Web App Development</CardTitle>
                  <CardDescription>Frontend and backend tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex h-[100px] items-center justify-center bg-muted/50">
                    <span className="text-sm text-muted-foreground">24 active tasks</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/boards/web-app">View Board</Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">Updated 2 hours ago</span>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Web App Development Board</h2>
          <KanbanBoard />
        </div>
      </main>
    </div>
  )
}
