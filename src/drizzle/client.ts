import { Organizations } from "@/drizzle/schema/organizations.ts";
import { UserOrganizations } from "@/drizzle/schema/userOrganizations.ts";
import { Users } from "@/drizzle/schema/users.ts";

import env from "@/env.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, {
  schema: {
    Users,
    Organizations,
    UserOrganizations,
  },
});
