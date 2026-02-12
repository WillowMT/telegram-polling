import type { Bot } from "grammy";
import { count, sql } from "drizzle-orm";
import { db, messageLog } from "../../db";

export function register(bot: Bot) {
  bot.command("testdb", async (ctx) => {
    if (!db) {
      await ctx.reply("Database is not configured.");
      return;
    }
    try {
      await db.execute(sql`SELECT 1 as ok`);
      await ctx.reply("Database connection OK");
    } catch (err) {
      await ctx.reply(
        `Database connection failed: ${err instanceof Error ? err.message : String(err)}`,
      );
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
}
