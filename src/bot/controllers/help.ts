import type { Bot } from "grammy";

const COMMANDS = [
  { command: "start", description: "Welcome message" },
  { command: "help", description: "List all commands" },
  { command: "ping", description: "Reply with pong" },
  { command: "stats", description: "Message count (requires database)" },
];

function buildHelpText(): string {
  const lines = [
    "Commands:",
    "",
    ...COMMANDS.map((c) => `/${c.command} — ${c.description}`),
    "",
    "Send any text message and I'll echo it back.",
  ];
  return lines.join("\n");
}

export function register(bot: Bot) {
  bot.command("help", async (ctx) => {
    await ctx.reply(buildHelpText());
  });
}
