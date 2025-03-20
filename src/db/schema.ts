import { users } from "@/db/schemas/users.ts";
import { organizations } from "@/db/schemas/organizations.ts";
import { userOrganizations } from "@/db/schemas/userOrganizations.ts";

export const schema = {
  users,
  organizations,
  userOrganizations,
};
