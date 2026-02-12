import { Bot } from "grammy";
import { count, sql } from "drizzle-orm";
import { db, hasDb, initDb, messageLog } from "./db";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply("Hello! I'm a Telegram bot powered by Bun and grammY."),
);

bot.command("ping", (ctx) => ctx.reply("pong"));

bot.command("testdb", async (ctx) => {
  if (!db) {
    await ctx.reply("Database is not configured.");
    return;
  }
  try {
    await db.execute(sql`SELECT 1 as ok`);
    await ctx.reply("Database connection OK");
  } catch (err) {
    await ctx.reply(`Database connection failed: ${err instanceof Error ? err.message : String(err)}`);
  }
});

bot.command("stats", async (ctx) => {
  if (!db) {
    await ctx.reply("Database is not configured. Set DATABASE_URL to enable stats.");
    return;
  }
  const [result] = await db.select({ count: count() }).from(messageLog);
  await ctx.reply(`Messages logged: ${result?.count ?? 0}`);
});

bot.on("message:text", async (ctx) => {
  if (db && ctx.message.text) {
    await db.insert(messageLog).values({
      chatId: String(ctx.chat.id),
      userId: String(ctx.from?.id ?? "unknown"),
      message: ctx.message.text,
    });
  }
  await ctx.reply(`You said: ${ctx.message.text}`);
});

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

async function main() {
  if (hasDb()) await initDb();
  bot.start();
}

main();
