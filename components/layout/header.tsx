"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, HelpCircle, Settings, User, Users, Webhook } from "lucide-react"
import { NotificationIndicator } from "@/components/notifications/notification-indicator"
import { useAdmin } from "@/components/auth/admin-provider"

export function Header() {
  const pathname = usePathname()
  const { admin } = useAdmin()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span>TaskFlow</span>
        </Link>
        <nav className="ml-6 flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              isActive("/") &&
              !pathname.startsWith("/projects") &&
              !pathname.startsWith("/boards") &&
              !pathname.startsWith("/tasks") &&
              !pathname.startsWith("/calendar") &&
              !pathname.startsWith("/resources") &&
              !pathname.startsWith("/documentation")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-medium ${
              isActive("/projects") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/boards"
            className={`text-sm font-medium ${
              isActive("/boards") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Boards
          </Link>
          <Link
            href="/tasks"
            className={`text-sm font-medium ${
              isActive("/tasks") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            My Tasks
          </Link>
          <Link
            href="/calendar"
            className={`text-sm font-medium ${
              isActive("/calendar") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Calendar
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-medium ${
              isActive("/resources") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Resources
          </Link>
          <Link
            href="/documentation"
            className={`text-sm font-medium ${
              isActive("/documentation") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Docs
          </Link>
          <Link
            href="/integrations"
            className={`text-sm font-medium ${
              isActive("/integrations") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Integrations
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <NotificationIndicator />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={admin?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={admin?.name || "Admin"}
                  />
                  <AvatarFallback>{admin?.initials || "A"}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex text-sm font-medium">{admin?.name || "Admin"}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/members" className="flex items-center cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team Members</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/notifications" className="flex items-center cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/integrations" className="flex items-center cursor-pointer">
                  <Webhook className="mr-2 h-4 w-4" />
                  <span>Integrations</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
