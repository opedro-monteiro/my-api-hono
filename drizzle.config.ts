import { defineConfig } from "drizzle-kit";
import env from "./src/env.ts";

export default defineConfig({
  out: "./src/db/migrations", // where migrations live
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
