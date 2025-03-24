import { db } from "@/drizzle/client.ts";
import { Organizations } from "@/drizzle/schema/organizations.ts";
import { eq } from "drizzle-orm";

export class OrganizationsService {
  // Criar uma organização
  static async createOrganization(name: string) {
    try {
      const newOrganization = await db
        .insert(Organizations)
        .values({ name })
        .returning();

      return newOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar organização.");
      }
    }
  }

  // Listar todas as organizações
  static async getOrganizations() {
    try {
      const organizations = await db
        .select()
        .from(Organizations);

      return organizations;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao listar organizações: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao listar organizações.");
      }
    }
  }

  // Buscar uma organização por ID
  static async getOrganizationById(id: string) {
    try {
      const organization = await db
        .select()
        .from(Organizations)
        .where(eq(Organizations.id, id));

      if (organization.length === 0) {
        throw new Error("Organização não encontrada");
      }

      return organization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar organização.");
      }
    }
  }

  // Atualizar uma organização
  static async updateOrganization(id: string, name: string) {
    try {
      const updatedOrganization = await db
        .update(Organizations)
        .set({ name, updatedAt: new Date() })
        .where(eq(Organizations.id, id))
        .returning();

      if (updatedOrganization.length === 0) {
        throw new Error("Organização não encontrada");
      }

      return updatedOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao atualizar organização.");
      }
    }
  }

  // Deletar uma organização
  static async deleteOrganization(id: string) {
    try {
      const deletedOrganization = await db
        .delete(Organizations)
        .where(eq(Organizations.id, id))
        .returning();

      if (deletedOrganization.length === 0) {
        throw new Error("Organização não encontrada");
      }

      return deletedOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao deletar organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao deletar organização.");
      }
    }
  }
}