import organizationRoutes from "@/routes/organizations.ts";
import { Hono } from "npm:hono";
import userRoutes from "./users.ts";
import userOrganizationRoutes from "@/routes/usersOrganizations.ts";

const router = new Hono();

// Defina um prefixo para cada grupo de rotas
router.route("/users", userRoutes);
router.route("/organizations", organizationRoutes);
router.route("/user-organizations", userOrganizationRoutes);

export default router;
