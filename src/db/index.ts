import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { resolve } from "node:path";
import { messageLog } from "./schema";

function getDbUrl(): string | null {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === "") return null;
  return url;
}

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  return db;
}

export function hasDb(): boolean {
  return getDbUrl() !== null;
}

export async function initDb(): Promise<void> {
  const url = getDbUrl();
  if (!url) return;

  const client = postgres(url);
  db = drizzle(client);
  const migrationsFolder = resolve(process.cwd(), "drizzle");
  await migrate(db, { migrationsFolder });
}

export { messageLog };
