import React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { RootLayout } from "@/components/layout/root-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TaskFlow - Project Management",
  description: "A comprehensive project management application",
  generator: 'v0.dev'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
