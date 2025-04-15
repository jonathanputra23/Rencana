"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Define user type
type User = {
  id: string
  name: string
  email: string
  avatar?: string
  initials: string
  role: "admin" | "manager" | "member" | "viewer"
  permissions: string[]
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  hasPermission: (permission: string) => boolean
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample user data
const sampleUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
  initials: "AJ",
  role: "admin",
  permissions: [
    "create:project",
    "edit:project",
    "delete:project",
    "create:task",
    "edit:task",
    "delete:task",
    "manage:users",
  ],
}

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading user data on mount
  useEffect(() => {
    // In a real app, this would check for a token and fetch user data
    const loadUser = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setUser(sampleUser)
      } catch (error) {
        console.error("Failed to load user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(sampleUser)
    } catch (error) {
      console.error("Failed to sign in:", error)
      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out function
  const signOut = () => {
    setUser(null)
  }

  // Check if user has a specific permission
  const hasPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
