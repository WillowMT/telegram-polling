import type { Bot } from "grammy";

export function register(bot: Bot) {
  bot.command("start", (ctx) =>
    ctx.reply("Hello! I'm a Telegram bot powered by Bun and grammY."),
  );

  bot.command("ping", (ctx) => ctx.reply("pong"));
}
