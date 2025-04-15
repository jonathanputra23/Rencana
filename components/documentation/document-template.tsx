"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Save, X } from "lucide-react"

interface DocumentTemplateProps {
  projectId: string
  docId: string
}

export function DocumentTemplate({ projectId, docId }: DocumentTemplateProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState("")

  // Get template content based on document type
  const getTemplateContent = () => {
    // This would be fetched from a database in a real app

    // Feasibility Report template
    if (docId === "feasibility-report") {
      return `# ${projectId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} - Feasibility Report

## 1. Executive Summary
[This section provides a brief overview of the project and the feasibility study findings.]

## 2. Project Overview
[Describe the project, its objectives, and scope.]

## 3. Market Analysis
### 3.1 Market Need
[Analyze the market need for the project.]

### 3.2 Competitive Analysis
[Analyze the competitive landscape.]

## 4. Technical Feasibility
[Assess the technical feasibility of the project.]

## 5. Operational Feasibility
[Assess the operational feasibility of the project.]

## 6. Economic Feasibility
[Assess the economic feasibility of the project, including cost-benefit analysis.]

## 7. Legal and Regulatory Feasibility
[Assess any legal or regulatory considerations.]

## 8. Timeline and Schedule
[Provide a high-level timeline for the project.]

## 9. Risk Assessment
[Identify and assess potential risks.]

## 10. Conclusion and Recommendations
[Provide conclusions and recommendations based on the feasibility study.]
`
    }

    // BRD template
    if (docId === "business-requirements-document") {
      return `# ${projectId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} - Business Requirements Document

## 1. Introduction
### 1.1 Purpose
[Describe the purpose of this document.]

### 1.2 Scope
[Define the scope of the business requirements.]

### 1.3 Definitions, Acronyms, and Abbreviations
[List any terms, definitions, acronyms, or abbreviations used in the document.]

## 2. Business Overview
[Provide an overview of the business context.]

## 3. Business Objectives
[List and describe the business objectives that the project aims to achieve.]

## 4. Stakeholders
[Identify and describe the stakeholders involved in the project.]

## 5. Business Requirements
### 5.1 Functional Requirements
[List and describe the functional business requirements.]

### 5.2 Non-Functional Requirements
[List and describe the non-functional business requirements.]

## 6. Business Process Models
[Include business process models or diagrams.]

## 7. Business Rules
[Define the business rules that apply to the project.]

## 8. Constraints
[Identify any business constraints.]

## 9. Assumptions and Dependencies
[List any assumptions made and dependencies identified.]

## 10. Success Criteria
[Define the criteria for measuring the success of the project.]
`
    }

    // Security Testing Checklist template
    if (docId === "security-testing-checklist") {
      return `# ${projectId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} - Security Testing Checklist (OWASP)

## 1. Authentication and Authorization
- [ ] Test for authentication bypass
- [ ] Test for weak passwords
- [ ] Test for insecure password recovery
- [ ] Test for session management vulnerabilities
- [ ] Test for privilege escalation

## 2. Input Validation
- [ ] Test for SQL injection
- [ ] Test for Cross-Site Scripting (XSS)
- [ ] Test for Cross-Site Request Forgery (CSRF)
- [ ] Test for command injection
- [ ] Test for file upload vulnerabilities

## 3. Data Protection
- [ ] Test for sensitive data exposure
- [ ] Test for insecure data storage
- [ ] Test for insecure data transmission
- [ ] Test for insufficient cryptography
- [ ] Test for information leakage

## 4. Configuration and Deployment
- [ ] Test for security misconfigurations
- [ ] Test for default credentials
- [ ] Test for unnecessary services
- [ ] Test for outdated components
- [ ] Test for insecure dependencies

## 5. API Security
- [ ] Test for insecure API endpoints
- [ ] Test for lack of rate limiting
- [ ] Test for improper asset management
- [ ] Test for insufficient logging and monitoring
- [ ] Test for insecure direct object references

## 6. Business Logic
- [ ] Test for business logic flaws
- [ ] Test for insecure workflow
- [ ] Test for race conditions
- [ ] Test for time-of-check to time-of-use issues
- [ ] Test for functionality abuse

## 7. Mobile-Specific (if applicable)
- [ ] Test for insecure data storage on device
- [ ] Test for insecure communication
- [ ] Test for insufficient code obfuscation
- [ ] Test for client-side injection
- [ ] Test for improper platform usage

## 8. IoT-Specific (if applicable)
- [ ] Test for insecure firmware
- [ ] Test for insecure communication protocols
- [ ] Test for physical security vulnerabilities
- [ ] Test for insecure update mechanism
- [ ] Test for insufficient privacy controls
`
    }

    // Default template
    return `# ${projectId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} - ${docId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")}

## Document Information
- **Version:** 1.0
- **Date:** April 15, 2023
- **Author:** Admin
- **Status:** Draft

## 1. Introduction
[Add introduction here]

## 2. Purpose
[Add purpose here]

## 3. Scope
[Add scope here]

## 4. Content
[Add content here]

## 5. References
[Add references here]
`
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="preview">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            {isEditing && <TabsTrigger value="edit">Edit</TabsTrigger>}
          </TabsList>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setIsEditing(false)}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  setContent(getTemplateContent())
                  setIsEditing(true)
                }}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
        <TabsContent value="preview" className="mt-4">
          <div className="prose max-w-none dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: getTemplateContent()
                  .replace(/\n/g, "<br>")
                  .replace(/\[([^\]]+)\]/g, '<em class="text-muted-foreground">$1</em>')
                  .replace(/^(#+)\s+(.*)$/gm, (_, hashes, text) => `<h${hashes.length}>${text}</h${hashes.length}>`),
              }}
            />
          </div>
        </TabsContent>
        {isEditing && (
          <TabsContent value="edit" className="mt-4">
            <textarea
              className="w-full h-[600px] p-4 font-mono text-sm border rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
