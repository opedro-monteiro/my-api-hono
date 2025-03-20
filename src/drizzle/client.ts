import { drizzle } from "drizzle-orm/postgres-js";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { schema } from "./schema/index.ts";

export const pg = await new Client({
  user: "docker",
  password: "docker",
  database: "mydb",
  hostname: "localhost",
  port: 5432,
});

export const db = drizzle(pg, { schema });
