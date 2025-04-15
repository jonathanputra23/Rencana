import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Plus } from "lucide-react"
import { TelegramIntegration } from "@/components/integrations/telegram-integration"
import { WebhookIntegration } from "@/components/integrations/webhook-integration"
import { N8nIntegration } from "@/components/integrations/n8n-integration"

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-muted-foreground">Connect TaskFlow with external services and tools</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          </div>
        </div>

        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TelegramIntegration />

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Email Notifications</CardTitle>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <CardDescription>Send task notifications via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" placeholder="smtp.example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">Port</Label>
                        <Input id="smtp-port" placeholder="587" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-security">Security</Label>
                        <select
                          id="smtp-security"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="tls">TLS</option>
                          <option value="ssl">SSL</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">Username</Label>
                      <Input id="smtp-username" placeholder="username@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">Password</Label>
                      <Input id="smtp-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline">Test Connection</Button>
                    <Button>Save Settings</Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Slack Notifications</CardTitle>
                    <Switch id="slack-notifications" />
                  </div>
                  <CardDescription>Send task notifications to Slack channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="slack-webhook">Webhook URL</Label>
                      <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slack-channel">Default Channel</Label>
                      <Input id="slack-channel" placeholder="#project-updates" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="slack-mentions" />
                      <Label htmlFor="slack-mentions">Include @mentions for assignees</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline">Test Webhook</Button>
                    <Button>Connect</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <WebhookIntegration />
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <N8nIntegration />

            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Create custom automation rules for tasks and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge>Active</Badge>
                        <h3 className="font-medium">Due Date Reminder</h3>
                      </div>
                      <Switch id="rule-1" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Send a notification 24 hours before a task is due
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Inactive</Badge>
                        <h3 className="font-medium">Task Assignment</h3>
                      </div>
                      <Switch id="rule-2" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Notify team members when they are assigned to a task
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge>Active</Badge>
                        <h3 className="font-medium">Status Change</h3>
                      </div>
                      <Switch id="rule-3" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Notify project members when a task status changes
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Rule
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API keys and access to the TaskFlow API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Admin API Key</h3>
                        <p className="text-sm text-muted-foreground">Full access to all API endpoints</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input value="sk_live_••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                      <Button variant="outline" size="sm">
                        Reveal
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Read-Only API Key</h3>
                        <p className="text-sm text-muted-foreground">Read-only access to API endpoints</p>
                      </div>
                      <Badge variant="outline">Inactive</Badge>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline">Generate Key</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Rotate Keys
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Key
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Access documentation for the TaskFlow API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">REST API Reference</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete documentation for all API endpoints, request and response formats
                    </p>
                    <Button variant="outline" className="mt-2">
                      View Documentation
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">Webhook Events</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Documentation for all webhook events and payload formats
                    </p>
                    <Button variant="outline" className="mt-2">
                      View Documentation
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">API Changelog</h3>
                    <p className="text-sm text-muted-foreground mt-1">History of API changes and updates</p>
                    <Button variant="outline" className="mt-2">
                      View Changelog
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
