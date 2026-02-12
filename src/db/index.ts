import { migrate } from "drizzle-orm/postgres-js/migrator";
import { resolve } from "node:path";
import { createDbClient, db, hasDb, type Db } from "./client";
import { messageLog } from "./schema";

export { db, createDbClient, hasDb, type Db } from "./client";
export { messageLog } from "./schema";

export async function initDb(): Promise<void> {
  if (!hasDb()) return;

  const client = createDbClient();
  const migrationsFolder = resolve(process.cwd(), "drizzle");
  await migrate(client, { migrationsFolder });
}
