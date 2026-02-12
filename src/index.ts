import { Bot } from "grammy";
import { registerControllers } from "./bot/controllers";
import { hasDb, initDb } from "./db";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

registerControllers(bot);

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

async function main() {
  if (hasDb()) await initDb();
  bot.start();
}

main();
