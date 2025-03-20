import { Hono } from "npm:hono";

const userRoutes = new Hono();

// Rota para listar usuários
userRoutes.get("/", (c) => {
  return c.json({ message: "Lista de usuários" });
});

// Rota para criar usuário
userRoutes.post("/", async (c) => {
  const body = await c.req.json();
  return c.json({ message: "Usuário criado", data: body });
});

export default userRoutes;
