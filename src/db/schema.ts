import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messageLog = pgTable("message_log", {
  id: serial("id").primaryKey(),
  chatId: text("chat_id").notNull(),
  userId: text("user_id").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
