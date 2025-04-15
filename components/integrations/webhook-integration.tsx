"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Webhook, Plus, Trash } from "lucide-react"

export function WebhookIntegration() {
  const [webhooks, setWebhooks] = useState([
    {
      id: "webhook-1",
      name: "Project Updates",
      url: "https://example.com/webhook",
      events: ["project.created", "project.updated"],
      active: true,
    },
  ])

  const [showNewWebhook, setShowNewWebhook] = useState(false)
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    events: [] as string[],
  })

  const handleAddWebhook = () => {
    if (newWebhook.name && newWebhook.url && newWebhook.events.length > 0) {
      setWebhooks([
        ...webhooks,
        {
          id: `webhook-${webhooks.length + 1}`,
          ...newWebhook,
          active: true,
        },
      ])
      setNewWebhook({
        name: "",
        url: "",
        events: [],
      })
      setShowNewWebhook(false)
    }
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))
  }

  const handleToggleEvent = (event: string) => {
    if (newWebhook.events.includes(event)) {
      setNewWebhook({
        ...newWebhook,
        events: newWebhook.events.filter((e) => e !== event),
      })
    } else {
      setNewWebhook({
        ...newWebhook,
        events: [...newWebhook.events, event],
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Webhook className="h-5 w-5" />
            <CardTitle>Webhooks</CardTitle>
          </div>
          <Button size="sm" onClick={() => setShowNewWebhook(!showNewWebhook)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Webhook
          </Button>
        </div>
        <CardDescription>Configure webhooks to receive event notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showNewWebhook && (
            <div className="rounded-md border p-4 space-y-4">
              <h3 className="font-medium">New Webhook</h3>
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Name</Label>
                <Input
                  id="webhook-name"
                  placeholder="My Webhook"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://example.com/webhook"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Events</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "task.created", label: "Task Created" },
                    { id: "task.updated", label: "Task Updated" },
                    { id: "task.deleted", label: "Task Deleted" },
                    { id: "project.created", label: "Project Created" },
                    { id: "project.updated", label: "Project Updated" },
                    { id: "project.deleted", label: "Project Deleted" },
                  ].map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.id}
                        checked={newWebhook.events.includes(event.id)}
                        onCheckedChange={() => handleToggleEvent(event.id)}
                      />
                      <Label htmlFor={event.id} className="text-sm font-normal">
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewWebhook(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddWebhook}
                  disabled={!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0}
                >
                  Add Webhook
                </Button>
              </div>
            </div>
          )}

          {webhooks.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No webhooks configured</p>
            </div>
          ) : (
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{webhook.name}</h3>
                      <Badge variant={webhook.active ? "default" : "outline"}>
                        {webhook.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{webhook.url}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
