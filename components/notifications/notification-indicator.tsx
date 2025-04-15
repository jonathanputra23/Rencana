"use client"

import { useState, useEffect } from "react"

export function NotificationIndicator() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll just set a random number
    setCount(Math.floor(Math.random() * 5))
  }, [])

  if (count === 0) return null

  return (
    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white font-medium">
      {count > 9 ? "9+" : count}
    </span>
  )
}
