import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Pencil, Share2 } from "lucide-react"

export default function FeasibilityReportPage() {
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
              <h1 className="text-2xl font-bold">Feasibility Report</h1>
              <Badge variant="outline">v1.0</Badge>
            </div>
            <p className="text-muted-foreground mt-1">Last updated: March 10, 2023 by Alex Johnson</p>
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

        <Card>
          <CardContent className="p-6">
            <div className="prose max-w-none dark:prose-invert">
              <h1>TaskFlow Project Management System: Feasibility Report</h1>
              
              <p><strong>Document Version:</strong> 1.0</p>
              <p><strong>Date:</strong> March 10, 2023</p>
              <p><strong>Prepared by:</strong> Alex Johnson, Project Lead</p>
              
              <h2>1. Executive Summary</h2>
              <p>
                This feasibility study evaluates the technical, operational, and economic viability of developing TaskFlow, 
                a comprehensive project management system designed to streamline task tracking, resource allocation, and team 
                collaboration. The study concludes that the project is feasible with moderate risk factors that can be mitigated 
                through proper planning and execution.
              </p>
              
              <h2>2. Project Overview</h2>
              <p>
                TaskFlow aims to provide a unified platform for project management with features including Kanban boards, 
                Gantt charts, resource allocation, task automation, due date tracking, and API integration capabilities. 
                The system will be designed as a web application with responsive design for mobile access.
              </p>
              
              <h2>3. Market Analysis</h2>
              <h3>3.1 Market Need</h3>
              <p>
                Current market research indicates a growing demand for integrated project management solutions that combine 
                traditional task tracking with modern collaboration features. Organizations are increasingly seeking tools 
                that can adapt to various project management methodologies while providing robust API access for integration 
                with existing systems.
              </p>
              
              <h3>3.2 Competitive Analysis</h3>
              <table className="min-w-full border-collapse border border-gray-300 my-4">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-gray-300 p-2 text-left">Competitor</th>
                    <th className="border border-gray-300 p-2 text-left">Strengths</th>
                    <th className="border border-gray-300 p-2 text-left">Weaknesses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Jira</td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>Robust issue tracking</li>
                        <li>Extensive customization</li>
                        <li>Strong integration ecosystem</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>Complex UI/UX</li>
                        <li>Steep learning curve</li>
                        <li>Resource management limitations</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Asana</td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>User-friendly interface</li>
                        <li>Strong collaboration features</li>
                        <li>Good mobile experience</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>Limited reporting capabilities</li>
                        <li>Basic Gantt functionality</li>
                        <li>API limitations</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Monday.com</td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>Visual appeal</li>
                        <li>Customizable workflows</li>
                        <li>Intuitive interface</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <ul className="list-disc pl-4 my-0">
                        <li>Higher price point</li>
                        <li>Complex permission system</li>
                        <li>Limited advanced features in lower tiers</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <h2>4. Technical Feasibility</h2>
              <h3>4.1 Technology Stack Assessment</h3>
              <p>
                The proposed technology stack for TaskFlow includes:
              </p>
              <ul>
                <li><strong>Frontend:</strong> Next.js with React, TypeScript, and Tailwind CSS</li>
                <li><strong>Backend:</strong> Node.js with Express or Next.js API routes</li>
                <li><strong>Database:</strong> PostgreSQL with Prisma O\
