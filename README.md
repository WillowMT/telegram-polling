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

Build only:

```bash
docker compose build
```

## Commands

- `/start` — Welcome message
- `/ping` — Responds with "pong"
- Any text message — Echoes back what you sent

## Environment

| Variable   | Description                    |
| ---------- | ------------------------------ |
| `BOT_TOKEN` | Your Telegram bot token from BotFather |
