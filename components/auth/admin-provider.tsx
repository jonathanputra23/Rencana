"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define admin type
type Admin = {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
}

// Define admin context type
type AdminContextType = {
  admin: Admin | null
  isLoading: boolean
}

// Create admin context
const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Sample admin data
const sampleAdmin: Admin = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
  initials: "AU",
}

// Admin provider component
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading admin data on mount
  useEffect(() => {
    const loadAdmin = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setAdmin(sampleAdmin)
      } catch (error) {
        console.error("Failed to load admin:", error)
        setAdmin(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadAdmin()
  }, [])

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

// Custom hook to use admin context
export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
