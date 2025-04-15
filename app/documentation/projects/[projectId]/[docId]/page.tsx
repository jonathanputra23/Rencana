import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Pencil, Share2 } from "lucide-react"
import { DocumentTemplate } from "@/components/documentation/document-template"

export default function DocumentPage({ params }: { params: { projectId: string; docId: string } }) {
  // In a real app, you would fetch document data based on the projectId and docId
  const projectName = params.projectId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const documentTitle = params.docId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/documentation">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Documentation
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{documentTitle}</h1>
              <Badge variant="outline">v1.0</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">Project: {projectName}</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-muted-foreground">Last updated: April 15, 2023 by Admin</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <DocumentTemplate projectId={params.projectId} docId={params.docId} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Document Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>Template</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span>1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>March 10, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>April 15, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Author:</span>
                    <span>Admin</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-2">Project Documents</h3>
                  <div className="space-y-2">
                    <Link
                      href={`/documentation/projects/${params.projectId}`}
                      className="text-sm text-primary hover:underline block"
                    >
                      View All Project Documents
                    </Link>
                    <Link
                      href={`/documentation/projects/${params.projectId}/product-requirements-document`}
                      className="text-sm hover:underline block"
                    >
                      Product Requirements Document
                    </Link>
                    <Link
                      href={`/documentation/projects/${params.projectId}/architecture-diagram`}
                      className="text-sm hover:underline block"
                    >
                      Architecture Diagram
                    </Link>
                    <Link
                      href={`/documentation/projects/${params.projectId}/deployment-guide`}
                      className="text-sm hover:underline block"
                    >
                      Deployment Guide
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
