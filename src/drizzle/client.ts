import { organizations } from "@/drizzle/schema/organizations.ts";
import { userOrganizations } from "@/drizzle/schema/userOrganizations.ts";
import { users } from "@/drizzle/schema/users.ts";

import env from "@/env.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, {
  schema: {
    users,
    organizations,
    userOrganizations,
  },
});
