import { Hono } from "npm:hono";

const organizationRoutes = new Hono();

// Rota para listar usuários
organizationRoutes.get("/", (c) => {
  return c.json({ message: "Lista de Oranizações" });
});

// Rota para criar usuário
organizationRoutes.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({ message: "Oranização criada com sucesso", data: body });
});

export default organizationRoutes;
