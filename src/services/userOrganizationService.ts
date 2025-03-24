import { db } from "@/drizzle/client.ts";
import { UserOrganizations } from "@/drizzle/schema/userOrganizations.ts";
import { and, eq } from "drizzle-orm";

export class UserOrganizationsService {
  // Criar uma relação entre usuário e organização
  static async createUserOrganization(userId: string, organizationId: string, isActive: boolean = true) {
    try {
      // Verificar se o usuário já pertence à organização
      const existingRelation = await db
        .select()
        .from(UserOrganizations)
        .where(
          and(
            eq(UserOrganizations.userId, userId),
            eq(UserOrganizations.organizationId, organizationId)
          )
        );

      if (existingRelation.length > 0) {
        throw new Error("O usuário já pertence a esta organização.");
      }

      // Se a nova relação for ativa, desativar a organização ativa atual do usuário
      if (isActive) {
        await db
          .update(UserOrganizations)
          .set({ isActive: false })
          .where(
            and(
              eq(UserOrganizations.userId, userId),
              eq(UserOrganizations.isActive, true)
          ));
      }

      // Criar a nova relação
      const newUserOrganization = await db
        .insert(UserOrganizations)
        .values({ userId, organizationId, isActive })
        .returning();

      return newUserOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar relação usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar relação usuário-organização.");
      }
    }
  }

  // Listar todas as relações usuário-organização
  static async getUserOrganizations() {
    try {
      const userOrganizations = await db
        .select()
        .from(UserOrganizations);

      return userOrganizations;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao listar relações usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao listar relações usuário-organização.");
      }
    }
  }

  // Buscar uma relação usuário-organização por ID
  static async getUserOrganizationById(id: string) {
    try {
      const userOrganization = await db
        .select()
        .from(UserOrganizations)
        .where(eq(UserOrganizations.id, id));

      if (userOrganization.length === 0) {
        throw new Error("Relação usuário-organização não encontrada");
      }

      return userOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar relação usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao buscar relação usuário-organização.");
      }
    }
  }

  // Atualizar uma relação usuário-organização
  static async updateUserOrganization(id: string, isActive: boolean) {
    try {
      // Se a relação for ativada, desativar a organização ativa atual do usuário
      if (isActive) {
        const userOrganization = await db
          .select()
          .from(UserOrganizations)
          .where(eq(UserOrganizations.id, id));

        if (userOrganization.length > 0) {
          const userId = userOrganization[0].userId;

          await db
            .update(UserOrganizations)
            .set({ isActive: false })
            .where(
              and(
                eq(UserOrganizations.userId, userId),
                eq(UserOrganizations.isActive, true)
            ));
        }
      }

      // Atualizar a relação
      const updatedUserOrganization = await db
        .update(UserOrganizations)
        .set({ isActive })
        .where(eq(UserOrganizations.id, id))
        .returning();

      if (updatedUserOrganization.length === 0) {
        throw new Error("Relação usuário-organização não encontrada");
      }

      return updatedUserOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao atualizar relação usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao atualizar relação usuário-organização.");
      }
    }
  }

  // Deletar uma relação usuário-organização
  static async deleteUserOrganization(id: string) {
    try {
      const deletedUserOrganization = await db
        .delete(UserOrganizations)
        .where(eq(UserOrganizations.id, id))
        .returning();

      if (deletedUserOrganization.length === 0) {
        throw new Error("Relação usuário-organização não encontrada");
      }

      return deletedUserOrganization[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao deletar relação usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao deletar relação usuário-organização.");
      }
    }
  }
}