"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"

interface AIDescriptionGeneratorProps {
  onDescriptionGenerated: (description: string) => void
}

export function AIDescriptionGenerator({ onDescriptionGenerated }: AIDescriptionGeneratorProps) {
  const [title, setTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const generateDescription = async () => {
    if (!title.trim()) {
      setError("Please enter a task title")
      return
    }

    setError("")
    setIsGenerating(true)

    try {
      const response = await fetch("/api/ai/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate description")
      }

      const data = await response.json()
      onDescriptionGenerated(data.description)
    } catch (err) {
      setError("Failed to generate description. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="button" onClick={generateDescription} disabled={isGenerating || !title.trim()} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Description
          </>
        )}
      </Button>
    </div>
  )
}
