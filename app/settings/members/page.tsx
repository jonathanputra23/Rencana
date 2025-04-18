"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { MembersList } from "@/components/settings/members-list"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"

export default function MembersPage() {
  // Dialog state
  const [open, setOpen] = useState(false)
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  async function handleCreateMember(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError("")
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newMemberName,
          email: newMemberEmail,
        }),
      })
      if (!res.ok) {
        setError("Failed to add member")
        setCreating(false)
        return
      }
      setNewMemberName("")
      setNewMemberEmail("")
      setOpen(false)
      // Optionally, refresh members list here
    } catch (err) {
      setError("Failed to add member")
    }
    setCreating(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Members</h1>
            <p className="text-muted-foreground">Manage team members for notifications</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search members..." className="pl-8 w-full md:w-[300px]" />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>
                    Enter the member's name and email.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateMember} className="space-y-4">
                  <Input
                    placeholder="Name"
                    value={newMemberName}
                    onChange={e => setNewMemberName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Email"
                    value={newMemberEmail}
                    onChange={e => setNewMemberEmail(e.target.value)}
                    required
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={creating}>
                      {creating ? "Adding..." : "Add"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About Team Members</CardTitle>
            <CardDescription>
              Team members in this system are for notification purposes only. They don't have access to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                When you add a team member, they can be assigned to tasks and will receive notifications via the
                configured notification channels (Telegram, email, etc.) when:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>They are assigned to a task</li>
                <li>A task they're assigned to is approaching its due date</li>
                <li>A task they're assigned to is overdue</li>
                <li>Someone comments on a task they're assigned to</li>
                <li>A task they're assigned to changes status</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Note: Team members do not have access to log into the system. This is a single-admin system where only
                you have access to the application.
              </p>
            </div>
          </CardContent>
        </Card>

        <MembersList />
      </main>
    </div>
  )
}
