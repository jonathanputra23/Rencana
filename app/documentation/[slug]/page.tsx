"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Pencil, Share2 } from "lucide-react"

export default function DocumentationDetailPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch document data based on the slug
  const documentTitle = params.slug
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
            <p className="text-muted-foreground mt-1">Last updated: April 15, 2023 by Alex Johnson</p>
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
                <div className="prose max-w-none dark:prose-invert">
                  <h2>Introduction</h2>
                  <p>
                    This document provides a comprehensive guide to the {documentTitle}. It covers all aspects of the
                    system, including installation, configuration, usage, and troubleshooting.
                  </p>

                  <h2>Purpose</h2>
                  <p>
                    The purpose of this document is to provide detailed information about the {documentTitle} to help
                    users understand how to effectively use and manage the system.
                  </p>

                  <h2>Scope</h2>
                  <p>This document covers all aspects of the {documentTitle}, including:</p>
                  <ul>
                    <li>System overview and architecture</li>
                    <li>Installation and configuration</li>
                    <li>User interface and navigation</li>
                    <li>Features and functionality</li>
                    <li>Administration and management</li>
                    <li>Troubleshooting and support</li>
                  </ul>

                  <h2>System Overview</h2>
                  <p>
                    The {documentTitle} is a comprehensive project management system designed to help teams collaborate
                    effectively, track tasks, and manage projects from initiation to completion.
                  </p>

                  <h3>Key Features</h3>
                  <ul>
                    <li>Project and task management</li>
                    <li>Team collaboration and communication</li>
                    <li>Resource allocation and tracking</li>
                    <li>Reporting and analytics</li>
                    <li>Integration with third-party tools</li>
                  </ul>

                  <h2>Getting Started</h2>
                  <p>To get started with the {documentTitle}, follow these steps:</p>
                  <ol>
                    <li>Install the system using the provided installation package</li>
                    <li>Configure the system settings according to your requirements</li>
                    <li>Create user accounts and assign permissions</li>
                    <li>Set up projects and teams</li>
                    <li>Start creating and managing tasks</li>
                  </ol>

                  <h2>Installation</h2>
                  <p>The installation process for the {documentTitle} involves the following steps:</p>
                  <ol>
                    <li>Download the installation package from the official website</li>
                    <li>Extract the package to your desired location</li>
                    <li>Run the installation wizard and follow the on-screen instructions</li>
                    <li>Configure the database connection</li>
                    <li>Start the application server</li>
                  </ol>

                  <h2>Configuration</h2>
                  <p>
                    After installation, you need to configure the system according to your requirements. The
                    configuration options include:
                  </p>
                  <ul>
                    <li>System settings</li>
                    <li>User authentication and authorization</li>
                    <li>Email notifications</li>
                    <li>Integration with third-party tools</li>
                    <li>Customization of workflows and templates</li>
                  </ul>

                  <h2>Usage</h2>
                  <p>This section provides detailed information about how to use the {documentTitle} effectively.</p>

                  <h3>User Interface</h3>
                  <p>
                    The user interface of the {documentTitle} is designed to be intuitive and user-friendly. It consists
                    of the following main components:
                  </p>
                  <ul>
                    <li>Dashboard</li>
                    <li>Projects</li>
                    <li>Tasks</li>
                    <li>Calendar</li>
                    <li>Reports</li>
                    <li>Settings</li>
                  </ul>

                  <h3>Creating Projects</h3>
                  <p>To create a new project, follow these steps:</p>
                  <ol>
                    <li>Navigate to the Projects section</li>
                    <li>Click on the "New Project" button</li>
                    <li>Enter the project details, including name, description, and start/end dates</li>
                    <li>Assign team members to the project</li>
                    <li>Configure project settings and permissions</li>
                    <li>Click "Create" to create the project</li>
                  </ol>

                  <h3>Managing Tasks</h3>
                  <p>Tasks are the building blocks of projects. To manage tasks effectively, you can:</p>
                  <ul>
                    <li>Create new tasks with detailed descriptions</li>
                    <li>Assign tasks to team members</li>
                    <li>Set priorities and due dates</li>
                    <li>Track task progress and status</li>
                    <li>Add comments and attachments to tasks</li>
                    <li>Create dependencies between tasks</li>
                  </ul>

                  <h2>Administration</h2>
                  <p>The administration section provides information about managing the {documentTitle} system.</p>

                  <h3>User Management</h3>
                  <p>As an administrator, you can manage users by:</p>
                  <ul>
                    <li>Creating new user accounts</li>
                    <li>Assigning roles and permissions</li>
                    <li>Managing user groups and teams</li>
                    <li>Resetting passwords</li>
                    <li>Disabling or deleting user accounts</li>
                  </ul>

                  <h3>System Settings</h3>
                  <p>The system settings allow you to configure various aspects of the {documentTitle}, including:</p>
                  <ul>
                    <li>General settings</li>
                    <li>Security settings</li>
                    <li>Email settings</li>
                    <li>Integration settings</li>
                    <li>Backup and restore</li>
                  </ul>

                  <h2>Troubleshooting</h2>
                  <p>This section provides information about common issues and their solutions.</p>

                  <h3>Common Issues</h3>
                  <ul>
                    <li>Login problems</li>
                    <li>Performance issues</li>
                    <li>Email notification failures</li>
                    <li>Integration errors</li>
                    <li>Data synchronization issues</li>
                  </ul>

                  <h3>Support</h3>
                  <p>
                    If you encounter any issues that are not covered in this document, please contact our support team
                    at support@example.com or visit our support portal at https://support.example.com.
                  </p>

                  <h2>Conclusion</h2>
                  <p>
                    This document provides a comprehensive guide to the {documentTitle}. By following the instructions
                    and guidelines provided in this document, you can effectively use and manage the system to improve
                    your team's productivity and project management capabilities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="#introduction" className="block text-sm hover:underline">
                    Introduction
                  </Link>
                  <Link href="#purpose" className="block text-sm hover:underline">
                    Purpose
                  </Link>
                  <Link href="#scope" className="block text-sm hover:underline">
                    Scope
                  </Link>
                  <Link href="#system-overview" className="block text-sm hover:underline">
                    System Overview
                  </Link>
                  <Link href="#getting-started" className="block text-sm hover:underline">
                    Getting Started
                  </Link>
                  <Link href="#installation" className="block text-sm hover:underline">
                    Installation
                  </Link>
                  <Link href="#configuration" className="block text-sm hover:underline">
                    Configuration
                  </Link>
                  <Link href="#usage" className="block text-sm hover:underline">
                    Usage
                  </Link>
                  <Link href="#administration" className="block text-sm hover:underline">
                    Administration
                  </Link>
                  <Link href="#troubleshooting" className="block text-sm hover:underline">
                    Troubleshooting
                  </Link>
                  <Link href="#conclusion" className="block text-sm hover:underline">
                    Conclusion
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/documentation/installation-guide" className="block text-sm hover:underline">
                    Installation Guide
                  </Link>
                  <Link href="/documentation/user-manual" className="block text-sm hover:underline">
                    User Manual
                  </Link>
                  <Link href="/documentation/api-documentation" className="block text-sm hover:underline">
                    API Documentation
                  </Link>
                  <Link href="/documentation/troubleshooting-guide" className="block text-sm hover:underline">
                    Troubleshooting Guide
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Document Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
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
                    <span>Alex Johnson</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviewers:</span>
                    <span>Sarah Miller, David Chen</span>
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
