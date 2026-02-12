import { sql } from "drizzle-orm";
import { createDbClient, db } from "../src/db/client";

try {
  createDbClient();
  const result = await db!.execute(sql`SELECT 1 as ok`);
  console.log("✓ Database connection successful:", result);
  process.exit(0);
} catch (err) {
  if (err instanceof Error && err.message === "DATABASE_URL is required") {
    console.error("DATABASE_URL is not set. Add it to .env");
  } else {
    console.error("✗ Database connection failed:", err);
  }
  process.exit(1);
}
