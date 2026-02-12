import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url && process.argv.some((a) => a.includes("migrate"))) {
  throw new Error(
    "DATABASE_URL is required for migrations. Set it in .env (see .env.example)"
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: url ?? "postgresql://localhost:5432/postgres",
  },
});
