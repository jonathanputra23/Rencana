**Project Plan: Rencana**

---

**Project Name:** Rencana  
**Type:** Internal Project & Documentation Management Tool  
**Owner:** Jonathan Putra  
**Access:** Private (Admin-only)

---

## 1. Objective
To build a customized, simplified, and private clone of Jira tailored for internal use. The platform, called **Rencana**, centralizes task management, documentation, and notification workflows for various internal projects.

---

## 2. Key Features

### 2.1 Project & Task Management
- Create and manage project boards.
- Customizable task columns (To Do, In Progress, Done, etc.).
- Add tasks with title, description, assignee, priority, status, and due date.
- AI-powered task description generation from task title.
- Visual Kanban board for task flow management.
- Gantt chart for timeline and workload tracking.
- Filterable overview dashboard to monitor all ongoing tasks across projects.
- Visual alerts for tasks nearing or past due.
- Resource Allocation view per PIC.

### 2.2 Notification System
- No user login/logout.
- Only admin (you) can access and manage the platform.
- Add members only for the purpose of task notification.
- Use **n8n** for integration with Telegram to notify PICs of tasks, especially those nearing/past due.

### 2.3 Documentation Management
- Each project has its own set of documents organized by development lifecycle phases:

#### Initiation
- Feasibility Report
- Stakeholder Map

#### Planning
- Business Requirements Document (BRD)
- Product Requirements Document (PRD)
- Risk Assessment
- Project Timeline

#### Design & Development
- Software & Hardware Design/Architecture Diagram
- UI Mockups
- Development Breakdown

#### Testing & Quality Assurance
- System Test Plan
- Bug Report Sheet
- UAT Checklist
- **Security Testing (OWASP Checklist)**

#### Deployment & Maintenance
- Deployment Guide
- Release Notes
- Change Log

#### Additional Project Documentation
- Assembly Manual
- Testing Manual
- FAT (Factory Acceptance Test)
- SAT (Site Acceptance Test)
- Packaging/Unpackaging Manual
- Installation Manual
- User & Troubleshooting Manual
- Product Brochure
- Product Presentation

---

## 3. Development Framework
Rencana follows a structured SDLC approach:

1. **Initiation**  
   \- Research and Feasibility Study

2. **Planning**  
   \- Requirements Definition (BRD, PRD)

3. **Design and Development**  
   \- Software & Hardware Design and Architecture
   \- Design Review, Verification, Validation
   \- Development

4. **Testing and Quality Control**  
   \- System Testing
   \- Integration Testing
   \- User Acceptance Testing (UAT)
   \- Security Testing

5. **Deployment and Maintenance**  
   \- Final Deployment
   \- Continuous Maintenance

*Each project in Rencana will have checklist templates to ensure all documentation from the framework is created.*

---

## 4. Technical Requirements
- Web-based interface (responsive UI)
- Local database or cloud-based storage
- Integration with n8n + Telegram API
- AI model integration for task description (e.g., OpenAI or local model)
- Authentication: hardcoded/admin-only (no public access)

---

## 5. Future Considerations
- Exporting documentation sets as PDF or ZIP per project
- Versioning system for documents
- Backup & sync with external storage (e.g., Google Drive, Dropbox)

---

## 6. Timeline (Example Draft)
| Phase                  | Timeline     |
|------------------------|--------------|
| Requirements & Planning| Week 1       |
| Design & Architecture  | Week 2       |
| Development            | Weeks 3 - 6  |
| Testing & Debugging    | Weeks 7 - 8  |
| Deployment             | Week 9       |
| Feedback & Maintenance | Week 10+     |

---

## 7. Success Metrics
- All internal projects managed via Rencana
- All project documentation centralized and completed per framework
- Notifications triggered for all critical task updates
- Zero bugs in document creation and viewing process

---

**End of Plan**

