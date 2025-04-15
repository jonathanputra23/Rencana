"use client"

import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
import { AdminProvider } from "@/components/auth/admin-provider"

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AdminProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
          <Toaster />
        </div>
      </AdminProvider>
    </ThemeProvider>
  )
}