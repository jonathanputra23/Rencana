"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Webhook } from "lucide-react"

export function N8nIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [n8nUrl, setN8nUrl] = useState("")
  const [apiKey, setApiKey] = useState("")

  const handleConnect = () => {
    if (n8nUrl && apiKey) {
      setIsConnected(true)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setN8nUrl("")
    setApiKey("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Webhook className="h-5 w-5 text-blue-500" />
            <CardTitle>n8n Integration</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>{isConnected ? "Connected" : "Not Connected"}</Badge>
        </div>
        <CardDescription>Connect to n8n for advanced workflow automation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">n8n Instance</p>
                    <p className="text-xs text-muted-foreground">{n8nUrl}</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="workflow-task-notifications">Task Notifications Workflow</Label>
                  <Switch id="workflow-task-notifications" defaultChecked />
                </div>
                <div className="text-xs text-muted-foreground">
                  Sends notifications to Telegram when tasks are assigned or due
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="workflow-data-sync">Data Synchronization Workflow</Label>
                  <Switch id="workflow-data-sync" />
                </div>
                <div className="text-xs text-muted-foreground">Syncs task data with external systems</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="workflow-reports">Automated Reports Workflow</Label>
                  <Switch id="workflow-reports" />
                </div>
                <div className="text-xs text-muted-foreground">Generates and sends weekly project reports</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="n8n-url">n8n URL</Label>
                <Input
                  id="n8n-url"
                  placeholder="https://n8n.example.com"
                  value={n8nUrl}
                  onChange={(e) => setN8nUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">The URL of your n8n instance</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="n8n_api_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Your n8n API key for authentication</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          {isConnected ? (
            <>
              <Button variant="outline" onClick={() => {}}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
              <Button onClick={handleConnect} disabled={!n8nUrl || !apiKey}>
                Connect
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
