"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash, Mail, Plus, Edit } from "lucide-react"

// Sample team members data
const initialMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    role: "Frontend Developer",
    department: "Engineering",
    notificationChannels: ["email", "telegram"],
    assignedTasks: 5,
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SM",
    role: "UX Designer",
    department: "Design",
    notificationChannels: ["email"],
    assignedTasks: 3,
  },
  {
    id: "3",
    name: "David Chen",
    email: "david.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DC",
    role: "Backend Developer",
    department: "Engineering",
    notificationChannels: ["telegram"],
    assignedTasks: 7,
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
    role: "QA Engineer",
    department: "Quality Assurance",
    notificationChannels: ["email", "telegram"],
    assignedTasks: 4,
  },
  {
    id: "5",
    name: "Michael Wong",
    email: "michael.wong@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MW",
    role: "DevOps Engineer",
    department: "Operations",
    notificationChannels: ["email"],
    assignedTasks: 2,
  },
]

export function MembersList() {
  const [members, setMembers] = useState(initialMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    notificationChannels: ["email"],
  })

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const initials = newMember.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

      const newMemberObj = {
        id: `${members.length + 1}`,
        name: newMember.name,
        email: newMember.email,
        avatar: "/placeholder.svg?height=40&width=40",
        initials,
        role: newMember.role,
        department: newMember.department,
        notificationChannels: newMember.notificationChannels,
        assignedTasks: 0,
      }

      setMembers([...members, newMemberObj])
      setNewMember({
        name: "",
        email: "",
        role: "",
        department: "",
        notificationChannels: ["email"],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-1 h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-right">
                    <div>{member.role}</div>
                    <div className="text-muted-foreground">{member.department}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-1">
                      {member.notificationChannels.includes("email") && <Badge variant="outline">Email</Badge>}
                      {member.notificationChannels.includes("telegram") && <Badge variant="outline">Telegram</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">{member.assignedTasks} assigned tasks</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Add a new team member for task assignment and notifications.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Software Engineer"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Engineering"
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notification Channels</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="email-channel"
                    checked={newMember.notificationChannels.includes("email")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewMember({
                          ...newMember,
                          notificationChannels: [...newMember.notificationChannels, "email"],
                        })
                      } else {
                        setNewMember({
                          ...newMember,
                          notificationChannels: newMember.notificationChannels.filter((c) => c !== "email"),
                        })
                      }
                    }}
                  />
                  <Label htmlFor="email-channel">Email</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="telegram-channel"
                    checked={newMember.notificationChannels.includes("telegram")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewMember({
                          ...newMember,
                          notificationChannels: [...newMember.notificationChannels, "telegram"],
                        })
                      } else {
                        setNewMember({
                          ...newMember,
                          notificationChannels: newMember.notificationChannels.filter((c) => c !== "telegram"),
                        })
                      }
                    }}
                  />
                  <Label htmlFor="telegram-channel">Telegram</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={!newMember.name || !newMember.email}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
