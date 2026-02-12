import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply("Hello! I'm a Telegram bot powered by Bun and grammY."),
);

bot.command("ping", (ctx) => ctx.reply("pong"));

bot.on("message:text", (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

bot.start();
