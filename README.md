# Telegram Polling Bot

A Telegram bot built with [Bun](https://bun.sh) and [grammY](https://grammy.dev), using long polling.

## Setup

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram and get your token.

2. Install dependencies:

```bash
bun install
```

3. Copy the env example and add your token:

```bash
cp .env.example .env
# Edit .env and set BOT_TOKEN=your_token
```

4. Run the bot:

```bash
bun run dev
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up -d
```

Set `DATABASE_URL` in `.env` to use an external PostgreSQL database.

## Commands

- `/start` — Welcome message
- `/ping` — Responds with "pong"
- `/stats` — Message count (requires database)
- Any text message — Echoes back what you sent

## Database (optional)

The bot runs without a database by default. To enable message logging and `/stats`:

1. Create the database (if using a new one): `createdb bot` or `CREATE DATABASE bot;` in psql
2. Set `DATABASE_URL` in `.env` (e.g. `postgresql://user:password@localhost:5432/bot`)
3. Generate migrations: `bun run db:generate`
4. Run migrations: `bun run db:migrate` (or start the bot — migrations run at startup)

```bash
bun run db:generate
bun run db:migrate
```

## Environment

| Variable      | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `BOT_TOKEN`   | Your Telegram bot token from BotFather                     |
| `DATABASE_URL` | Optional. PostgreSQL connection string for message logging |
