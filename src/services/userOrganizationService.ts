import { db } from "@/drizzle/client.ts";
import { Organizations } from "@/drizzle/schema/organizations.ts";
import { UserOrganizations } from "@/drizzle/schema/userOrganizations.ts";
import { Users } from "@/drizzle/schema/users.ts";
import { and, eq } from "drizzle-orm";
import { create } from "node:domain";

export class UserOrganizationsService {
  static async createUserOrganization(userId: string, organizationId: string, isActive: boolean = true) {
    try {
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

  static async getUserOrganizations() {
    try {
      const userOrganizations = await db
        .select({
          userId: Users.id,
          organizationId: Organizations.id,
          userOrganizationId: UserOrganizations.id,
          isActive: UserOrganizations.isActive,
          userName: Users.name,
          email: Users.email,
          organizationName: Organizations.name,
          createdAt: UserOrganizations.createdAt,
        })
        .from(UserOrganizations)
        .innerJoin(Users, eq(Users.id, UserOrganizations.userId))
        .innerJoin(Organizations, eq(Organizations.id, UserOrganizations.organizationId));

      return userOrganizations;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao listar relações usuário-organização: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao listar relações usuário-organização.");
      }
    }
  }

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

  static async updateUserOrganization(id: string, isActive: boolean) {
    try {
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