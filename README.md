# Prisma Pulse Example: Fullstack Leaderboard (Next.js)

This repository contains an example app that uses Prisma Pulse in a Next.js fullstack application to display and update a real-time leaderboard:

- Next.js (frontend) with a [custom server]() (backend)
- Socket.io (websocket connection)
- Pulse (real-time updates from the database)

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a Pulse-ready database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))
- A **Pulse API key** which you can get by enabling Pulse in a project in your [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))
- A **Resend API Key** which you can get from your [Resend account](https://resend.com/api-keys)

## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/pulse/leaderboard
npm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and update the `DATABASE_URL` and `PULSE_API_KEY` environment variables with the values of your connection string, your Pulse and Resend API keys:

```bash
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
PULSE_API_KEY="__YOUR_PULSE_API_KEY__"
RESEND_API_KEY="__YOUR_RESEND_API_KEY__"
```

Note that `__YOUR_DATABASE_CONNECTION_STRING__`, `__YOUR_PULSE_API_KEY__` and `__YOUR_RESEND_API_KEY__` are placeholder values that you need to replace with the values of your own connection string, your Pulse and Resend API keys.

### 3. Run a database migration to create the `Player` table

The [Prisma schema file](./prisma/schema.prisma) in this project contains a single `Player` model. You can map this model to the database and create the corresponding `Player` table using the following command:

```
npx prisma migrate dev --name init
```

You now have an empty `Player` table in your database.

### 4. Start the server

Start the server that 

```
npm run server
```

This will ... TBD

### 5. Use the app


TBD

## Resources

- [Pulse examples](https://pris.ly/pulse-examples)
- [Pulse documentation](https://pris.ly/pulse-docs)
- [Pulse announcement blog post](https://pris.ly/gh/pulse-ga)
- [Prisma Discord](https://pris.ly/discord)
