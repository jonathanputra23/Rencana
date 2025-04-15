import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, Calendar, Key, Lock, LogOut, Mail, User } from "lucide-react"

export default function ProfilePage() {
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
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Johnson" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Alex Johnson</h1>
              <p className="text-muted-foreground">Senior Frontend Developer</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">UI/UX</Badge>
                <Badge variant="outline">Next.js</Badge>
              </div>
            </div>
            <div className="md:ml-auto flex gap-2">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profile" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Johnson" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Senior Frontend Developer with 5+ years of experience building responsive web applications. Passionate about clean code and user experience."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Senior Frontend Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Engineering" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Add or remove skills from your profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-3 py-1">
                      React <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      TypeScript <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      Next.js <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      UI/UX <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      Tailwind CSS <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      JavaScript <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add a new skill..." />
                    <Button>Add</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex gap-2">
                      <Input id="username" defaultValue="alexjohnson" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-account">Email</Label>
                    <div className="flex gap-2">
                      <Input id="email-account" type="email" defaultValue="alex.johnson@example.com" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="flex gap-2">
                      <Input type="password" value="••••••••" disabled />
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                          <span>Two-factor authentication</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-red-200 p-3">
                    <div className="space-y-0.5">
                      <div>Delete Account</div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </div>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Task assignments</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Task updates</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Project updates</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Comments and mentions</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Due date reminders</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Choose how you want to receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>Email notifications</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <div>Browser notifications</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>Calendar integration</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and updates.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Completed task",
                        item: "Update user authentication flow",
                        time: "10 minutes ago",
                        project: "Web App",
                      },
                      {
                        action: "Commented on",
                        item: "API documentation update",
                        time: "25 minutes ago",
                        project: "API",
                      },
                      {
                        action: "Created task",
                        item: "Implement database migration script",
                        time: "1 hour ago",
                        project: "Database",
                      },
                      {
                        action: "Updated",
                        item: "Fix mobile navigation bug",
                        time: "2 hours ago",
                        project: "Mobile App",
                      },
                      {
                        action: "Completed task",
                        item: "Set up CI/CD pipeline",
                        time: "3 hours ago",
                        project: "DevOps",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="rounded-full bg-muted p-2">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.action} <span className="font-semibold text-primary">{activity.item}</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {activity.project}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent account access.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        device: "MacBook Pro",
                        location: "San Francisco, CA",
                        ip: "192.168.1.1",
                        time: "Today, 10:30 AM",
                      },
                      {
                        device: "iPhone 13",
                        location: "San Francisco, CA",
                        ip: "192.168.1.2",
                        time: "Yesterday, 8:12 PM",
                      },
                      {
                        device: "Windows PC",
                        location: "San Francisco, CA",
                        ip: "192.168.1.3",
                        time: "Apr 12, 2023, 3:45 PM",
                      },
                    ].map((login, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                        <div className="rounded-full bg-muted p-2">
                          <Key className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{login.device}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <p className="text-xs text-muted-foreground">{login.location}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">•</p>
                            <p className="text-xs text-muted-foreground">IP: {login.ip}</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">•</p>
                            <p className="text-xs text-muted-foreground">{login.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
