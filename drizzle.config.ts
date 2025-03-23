import { defineConfig } from "drizzle-kit";
import env from "./src/env.ts";

export default defineConfig({
  schema: "./src/drizzle/schema",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL
  }
})