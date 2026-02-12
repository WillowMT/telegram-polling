import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = ReturnType<typeof createDb>;

function createDb(url: string) {
  const client = postgres(url);
  return drizzle(client, { schema });
}

export let db: Db | null = null;

export function createDbClient(url?: string): Db {
  const connectionUrl = url ?? process.env.DATABASE_URL;
  if (!connectionUrl?.trim()) {
    throw new Error("DATABASE_URL is required");
  }
  db = createDb(connectionUrl);
  return db;
}

export function hasDb(): boolean {
  const url = process.env.DATABASE_URL;
  return !!(url && url.trim() !== "");
}

export { schema };
