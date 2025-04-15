import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DocumentLink {
  name: string
  path: string
}

interface DocumentationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  documents: DocumentLink[]
}

export function DocumentationCard({ title, description, icon, documents }: DocumentationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="mt-1">{icon}</div>
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between">
              <Link href={doc.path} className="text-sm hover:underline">
                {doc.name}
              </Link>
              <Badge variant="outline" className="text-xs">
                Doc
              </Badge>
            </div>
          ))}
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/documentation/category/${title.toLowerCase().replace(/\s+/g, "-")}`}>View All</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
