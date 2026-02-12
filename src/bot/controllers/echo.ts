import type { Bot } from "grammy";
import { db, messageLog } from "../../db";

export function register(bot: Bot) {
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
}
