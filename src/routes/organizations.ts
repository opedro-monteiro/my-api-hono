import { OrganizationsService } from "@/services/OrganizationService.ts";
import { Hono } from "npm:hono";

const organizationsRoutes = new Hono();

organizationsRoutes.post("/", async (c) => {
  try {
    const { name } = await c.req.json();
    const newOrganization = await OrganizationsService.createOrganization(name);
    return c.json(newOrganization, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao criar organização." }, 500);
    }
  }
});

organizationsRoutes.get("/", async (c) => {
  try {
    const organizations = await OrganizationsService.getOrganizations();
    return c.json(organizations);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else {
      return c.json({ error: "Erro desconhecido ao listar organizações." }, 500);
    }
  }
});

organizationsRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const organization = await OrganizationsService.getOrganizationById(id);
    return c.json(organization);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 404);
    } else {
      return c.json({ error: "Erro desconhecido ao buscar organização." }, 500);
    }
  }
});

organizationsRoutes.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { name } = await c.req.json();
    const updatedOrganization = await OrganizationsService.updateOrganization(id, name);
    return c.json(updatedOrganization);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao atualizar organização." }, 500);
    }
  }
});

organizationsRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deletedOrganization = await OrganizationsService.deleteOrganization(id);
    return c.json({ message: "Organização deletada com sucesso", deletedOrganization });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "Erro desconhecido ao deletar organização." }, 500);
    }
  }
});

export default organizationsRoutes;
