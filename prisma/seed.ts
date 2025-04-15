import dotenv from 'dotenv'
dotenv.config()

import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      telegram_id: '123456789',
    },
  })
  console.log('Created admin user:', admin.name)

  // Create team members
  const members = await Promise.all([
    prisma.user.upsert({
      where: { email: 'developer@example.com' },
      update: {},
      create: {
        name: 'Developer User',
        email: 'developer@example.com',
        role: 'member',
        telegram_id: '987654321',
      },
    }),
    prisma.user.upsert({
      where: { email: 'designer@example.com' },
      update: {},
      create: {
        name: 'Designer User',
        email: 'designer@example.com',
        role: 'member',
        telegram_id: '456789123',
      },
    }),
  ])
  console.log(`Created ${members.length} team members`)

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Sample Project',
      description: 'This is a sample project for testing purposes',
    },
  })
  console.log('Created project:', project.name)

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Set up project repository',
        description: 'Initialize Git repository and set up project structure',
        status: 'Done',
        priority: 'High',
        projectId: project.id,
        assigneeId: admin.id,
        dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
    }),
    prisma.task.create({
      data: {
        title: 'Design user interface',
        description: 'Create wireframes and mockups for the main screens',
        status: 'In Progress',
        priority: 'Medium',
        projectId: project.id,
        assigneeId: members[1].id, // Designer
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement backend API',
        description: 'Develop RESTful API endpoints for the application',
        status: 'To Do',
        priority: 'High',
        projectId: project.id,
        assigneeId: members[0].id, // Developer
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    }),
  ])
  console.log(`Created ${tasks.length} tasks`)

  // Create documents
  const documents = await Promise.all([
    prisma.document.create({
      data: {
        title: 'Project Requirements',
        phase: 'Planning',
        content: '# Project Requirements\n\nThis document outlines the requirements for the Sample Project.\n\n## Functional Requirements\n\n- User authentication\n- Dashboard\n- Project management\n- Task tracking\n\n## Non-Functional Requirements\n\n- Performance\n- Security\n- Usability',
        projectId: project.id,
      },
    }),
    prisma.document.create({
      data: {
        title: 'Design Specifications',
        phase: 'Design & Development',
        content: '# Design Specifications\n\nThis document outlines the design specifications for the Sample Project.\n\n## Color Palette\n\n- Primary: #3B82F6\n- Secondary: #6B7280\n- Accent: #10B981\n\n## Typography\n\n- Headings: Inter, sans-serif\n- Body: Inter, sans-serif',
        projectId: project.id,
      },
    }),
  ])
  console.log(`Created ${documents.length} documents`)

  // Create notifications
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        type: 'Task Assignment',
        status: 'Sent',
        taskId: tasks[1].id,
        userId: members[1].id,
      },
    }),
    prisma.notification.create({
      data: {
        type: 'Task Assignment',
        status: 'Sent',
        taskId: tasks[2].id,
        userId: members[0].id,
      },
    }),
    prisma.notification.create({
      data: {
        type: 'Due Date Reminder',
        status: 'Sent',
        taskId: tasks[1].id,
        userId: members[1].id,
      },
    }),
  ])
  console.log(`Created ${notifications.length} notifications`)

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })