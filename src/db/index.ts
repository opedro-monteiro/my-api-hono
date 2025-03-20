import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import env from "@/env.ts";
import * as schema from "./schema.ts";

// Use pg driver.
const { Pool } = pg;

const db = drizzle({
  client: new Pool({
    connectionString: env.DATABASE_URL,
  }),
  schema,
});

export default db;
