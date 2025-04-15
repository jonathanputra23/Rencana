# Local Development and Running Instructions for Rencana

This document provides instructions to run the Rencana project locally without using Docker.

---

## Prerequisites

- Node.js 18 or higher
- PostgreSQL installed and running locally
- npm or pnpm package manager
- OpenAI API key (for AI task description generation)
- Telegram Bot Token (for notifications)

---

## 1. Set up PostgreSQL Database

1. Ensure PostgreSQL server is running locally on default port 5432.
2. Create a database named `rencana_db`:

```bash
createdb rencana_db
```

3. Update `.env` file with your PostgreSQL connection string, for example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rencana_db?schema=public"
```

---

## 2. Install Dependencies

Run the following command to install project dependencies:

```bash
npm install
```

or if using pnpm:

```bash
pnpm install
```

---

## 3. Run Database Migrations and Seed Data

Run the following commands to apply database migrations and seed initial data:

```bash
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
```

Note: The Prisma client is configured to generate to a custom location (`../lib/generated/prisma`). Make sure to import from `./generated/prisma` instead of `@prisma/client` in your code.

---

## 4. Set Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`) and set the following variables:

```
ADMIN_API_TOKEN="your-admin-token"
NEXT_PUBLIC_ADMIN_API_TOKEN="your-admin-token"  # Same value as ADMIN_API_TOKEN
OPENAI_API_KEY="your-openai-api-key"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
```

Note: The `NEXT_PUBLIC_ADMIN_API_TOKEN` is required for client-side API calls and should have the same value as `ADMIN_API_TOKEN`.

---

## 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 6. Accessing the API

All API endpoints require an `Authorization` header with the admin token:

```
Authorization: Bearer your-admin-token
```

---

## 7. Notes

- This setup runs the database locally without Docker.
- For notifications, ensure your Telegram bot token is valid and n8n workflows are configured separately.
- For AI task description generation, ensure your OpenAI API key is valid.

---

This completes the local development setup for Rencana.