import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
import { AdminProvider } from "@/components/auth/admin-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TaskFlow - Project Management",
  description: "A comprehensive project management application",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              {children}
              <Toaster />
            </div>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'