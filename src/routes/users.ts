import { UserService } from "@/services/userService.ts";
import { Hono } from "npm:hono";

const userRoutes = new Hono();

// Rota para listar usuários
userRoutes.get("/", async (c) => {
  try {
    const users = await UserService.getUsers();
    return c.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "Erro desconhecido ao listar usuários" }, 500);
    }
  }
});

// Rota para buscar usuário por ID
userRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await UserService.getUserById(id);

    if (!user) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }

    return c.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "Erro desconhecido ao buscar usuário" }, 500);
    }
  }
});

// Rota para criar usuário
userRoutes.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const newUser = await UserService.createUser(body);
    return c.json(newUser, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao criar usuário" }, 400);
    }
  }
});

// Rota para atualizar usuário
userRoutes.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedUser = await UserService.updateUser(id, body.name, body.email);

    if (!updatedUser) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }

    return c.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao atualizar usuário" }, 400);
    }
  }
});

// Rota para deletar usuário
userRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deletedUser = await UserService.deleteUser(id);

    if (!deletedUser) {
      return c.json({ error: "Usuário não encontrado" }, 404);
    }

    return c.json({ message: "Usuário deletado com sucesso", id: deletedUser.id, name: deletedUser.name });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao deletar usuário" }, 400);
    }
  }
});

export default userRoutes;