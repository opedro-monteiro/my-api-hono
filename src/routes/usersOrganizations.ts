import { Hono } from "npm:hono";

const userOrganizationRoutes = new Hono();

// Rota para listar usuários
userOrganizationRoutes.get("/", (c) => {
  return c.json({ message: "Lista de Oranizações" });
});

// Rota para criar usuário
userOrganizationRoutes.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({ message: "Oranização com usuario", data: body });
});

export default userOrganizationRoutes;
