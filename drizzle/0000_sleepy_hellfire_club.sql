CREATE TABLE "message_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" text NOT NULL,
	"user_id" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
