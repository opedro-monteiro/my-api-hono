import { UserOrganizationsService } from "@/services/userOrganizationService.ts";
import { Hono } from "npm:hono";

const userOrganizationsRoutes = new Hono();

userOrganizationsRoutes.post("/", async (c) => {
  try {
    const { userId, organizationId, isActive } = await c.req.json();
    const newUserOrganization = await UserOrganizationsService.createUserOrganization(userId, organizationId, isActive);
    return c.json(newUserOrganization, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao criar relação usuário-organização." }, 500);
    }
  }
});

userOrganizationsRoutes.get("/", async (c) => {
  try {
    const userOrganizations = await UserOrganizationsService.getUserOrganizations();
    return c.json(userOrganizations);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "Erro desconhecido ao listar relações usuário-organização." }, 500);
    }
  }
});

userOrganizationsRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const userOrganization = await UserOrganizationsService.getUserOrganizationById(id);
    return c.json(userOrganization);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 404);
    } else {
      return c.json({ error: "Erro desconhecido ao buscar relação usuário-organização." }, 500);
    }
  }
});

userOrganizationsRoutes.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { isActive } = await c.req.json();
    const updatedUserOrganization = await UserOrganizationsService.updateUserOrganization(id, isActive);
    return c.json(updatedUserOrganization);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao atualizar relação usuário-organização." }, 500);
    }
  }
});

userOrganizationsRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deletedUserOrganization = await UserOrganizationsService.deleteUserOrganization(id);
    return c.json({ message: "Relação usuário-organização deletada com sucesso", deletedUserOrganization });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao deletar relação usuário-organização." }, 500);
    }
  }
});

export default userOrganizationsRoutes;