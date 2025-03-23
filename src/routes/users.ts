import { UserService } from "@/services/userService.ts";
import { Hono } from "npm:hono";

const userRoutes = new Hono();

userRoutes.get("/", async (c) => {
  try {
    const { name, email, page = "1", limit = "10" } = c.req.query();
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const users = await UserService.getUsers({
      name,
      email,
      page: pageNumber,
      limit: limitNumber,
    });
    return c.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "Erro desconhecido ao listar usuários" }, 500);
    }
  }
});

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
