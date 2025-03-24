import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { Organizations } from "./organizations.ts";
import { Users } from "./users.ts";

export const UserOrganizations = pgTable("user_organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => Users.id).notNull(),
  organizationId: uuid("organization_id").references(() => Organizations.id)
    .notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
