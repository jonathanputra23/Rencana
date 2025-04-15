"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, RefreshCw } from "lucide-react"

export function TelegramIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [botToken, setBotToken] = useState("")
  const [chatId, setChatId] = useState("")

  const handleConnect = () => {
    if (botToken && chatId) {
      setIsConnected(true)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setBotToken("")
    setChatId("")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg font-medium">Telegram</CardTitle>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>{isConnected ? "Connected" : "Not Connected"}</Badge>
        </div>
        <CardDescription>Send task notifications via Telegram</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isConnected ? (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Bot Name</p>
                    <p className="text-xs text-muted-foreground">TaskFlow Notifications</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-task-assigned">Task Assigned</Label>
                  <Switch id="notify-task-assigned" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-task-due">Task Due Soon</Label>
                  <Switch id="notify-task-due" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-task-overdue">Task Overdue</Label>
                  <Switch id="notify-task-overdue" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-status-change">Status Change</Label>
                  <Switch id="notify-status-change" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-comments">New Comments</Label>
                  <Switch id="notify-comments" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-token">Bot Token</Label>
                <Input
                  id="bot-token"
                  placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Create a bot via{" "}
                  <a
                    href="https://t.me/BotFather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @BotFather
                  </a>{" "}
                  and paste the token here
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chat-id">Chat ID</Label>
                <Input
                  id="chat-id"
                  placeholder="-1001234567890"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Add the bot to a group or channel and get the chat ID</p>
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
                Test Notification
              </Button>
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">Learn More</Button>
              <Button onClick={handleConnect} disabled={!botToken || !chatId}>
                Connect
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
