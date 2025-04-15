# Rencana - Project Management Application

Rencana is a customized, simplified, and private clone of Jira tailored for internal use. The platform centralizes task management, documentation, and notification workflows for various internal projects.

## Features

- **Project & Task Management**: Create and manage project boards with customizable task columns and Kanban board
- **Task List & Calendar**: Visualize tasks in a list, Kanban, and Gantt chart calendar view
- **Documentation Management**: Organize project documents by development lifecycle phases, with dynamic creation and editing
- **Notification System**: Integration with n8n and Telegram for task notifications, plus email and webhook support
- **AI-powered**: Task description generation using OpenAI
- **Integrations**: Easily connect webhooks, Telegram, n8n, and more via the Integrations menu
- **Admin-only Access**: Secure, private platform for internal use

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Admin-only middleware
- **AI Integration**: OpenAI API
- **Notification**: n8n workflow integration with Telegram API
- **Deployment**: Docker containerization

## Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database
- Docker and Docker Compose (for containerized deployment)
- OpenAI API key (for AI task description generation)
- Telegram Bot Token (for notifications)
- n8n instance for workflow automation (optional, for advanced notifications)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rencana.git
   cd rencana
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables with your values

4. Start the PostgreSQL database:
   ```bash
   # Option 1: If you have PostgreSQL installed locally
   # Start your local PostgreSQL server

   # Option 2: Using Docker to run just the database
   docker-compose up -d postgres
   ```

5. Set up the database with migrations, client generation, and seed data:
   ```bash
   npm run db:setup
   ```

   Or run each step individually:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npx prisma db seed
   ```

6. Run the development server:
   ```bash
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rencana.git
   cd rencana
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables with your values

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Authentication

All API endpoints are protected by admin-only authentication. To access the API, include the following header in your requests:

```
Authorization: Bearer your-admin-token
```

The admin token is defined in the `.env` file as `ADMIN_API_TOKEN`.

## Project Structure

- `/app`: Next.js application pages and API routes (including all main menu content and API endpoints)
- `/components`: React components (UI, features, integrations, etc.)
- `/lib`: Utility functions and shared code
- `/prisma`: Database schema and migrations
- `/public`: Static assets
- `/styles`: Global CSS styles

## API Endpoints

### Projects

- `GET /api/v1/projects`: Get all projects
- `POST /api/v1/projects`: Create a new project
- `GET /api/v1/projects/:id`: Get a specific project
- `PUT /api/v1/projects/:id`: Update a project
- `DELETE /api/v1/projects/:id`: Delete a project

### Boards

- `GET /api/v1/boards`: Get all boards
- `POST /api/v1/boards`: Create a new board
- `GET /api/v1/boards/:id`: Get a specific board
- `PUT /api/v1/boards/:id`: Update a board
- `DELETE /api/v1/boards/:id`: Delete a board

### Tasks

- `GET /api/v1/tasks`: Get all tasks
- `POST /api/v1/tasks`: Create a new task
- `GET /api/v1/tasks/:id`: Get a specific task
- `PUT /api/v1/tasks/:id`: Update a task
- `DELETE /api/v1/tasks/:id`: Delete a task

### Users

- `GET /api/v1/users`: Get all users
- `POST /api/v1/users`: Create a new user
- `GET /api/v1/users/:id`: Get a specific user
- `PUT /api/v1/users/:id`: Update a user
- `DELETE /api/v1/users/:id`: Delete a user

### Documents

- `GET /api/v1/documents`: Get all documents
- `POST /api/v1/documents`: Create a new document
- `GET /api/v1/documents/:id`: Get a specific document
- `PUT /api/v1/documents/:id`: Update a document
- `DELETE /api/v1/documents/:id`: Delete a document

### Notifications

- `GET /api/v1/notifications`: Get all notifications
- `POST /api/v1/notifications`: Create a new notification
- `GET /api/v1/notifications/:id`: Get a specific notification
- `PUT /api/v1/notifications/:id`: Update a notification
- `DELETE /api/v1/notifications/:id`: Delete a notification

### Integrations

- `GET /api/v1/integrations`: Get all integrations
- `POST /api/v1/integrations`: Create a new integration
- `GET /api/v1/integrations/:id`: Get a specific integration
- `PUT /api/v1/integrations/:id`: Update an integration
- `DELETE /api/v1/integrations/:id`: Delete an integration

### AI

- `POST /api/ai/generate-description`: Generate a task description from a title

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.