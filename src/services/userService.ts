import { db } from "@/drizzle/client.ts";
import { Users } from "@/drizzle/schema/users.ts";
import { CreateUserDto, createUserSchemaDto } from "@/models/user/createUserDto.ts";
import { eq } from "drizzle-orm";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export class UserService {
  // Criar usuário
  static async createUser(userDto: CreateUserDto) {
    try {
      const result = createUserSchemaDto.safeParse(userDto);

      if (!result.success) {
        throw new Error(`Validação falhou: ${result.error.toString()}`);
      }

      const data = result.data;

      // Verificar se o usuário já existe
      const existsUser = await db.select().from(Users).where(eq(Users.email, data.email));

      if (existsUser.length > 0) {
        throw new Error("Usuário já existe com esse e-mail");
      }

      // Gerar hash da senha
      const hashPassword = await bcrypt.hash(data.password);

      // Inserir o usuário no banco de dados
      const user = await db.insert(Users).values({
        name: data.name,
        email: data.email,
        password: hashPassword,
      }).returning();

      // Retornar dados do usuário
      return {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        createdAt: user[0].createdAt,
        updatedAt: user[0].updatedAt,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar usuário: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao criar usuário.");
      }
    }
  }

  // Listar usuários
  static async getUsers() {
    const users = await db
      .select({
        id: Users.id,
        name: Users.name,
        email: Users.email,
        createdAt: Users.createdAt,
        updatedAt: Users.updatedAt,
      })
      .from(Users);

    return users; // Retornar diretamente o array
  }

  // Buscar usuário por ID
  static async getUserById(id: string) {
    const user = await db
      .select({
        id: Users.id,
        name: Users.name,
        email: Users.email,
        createdAt: Users.createdAt,
        updatedAt: Users.updatedAt,
      })
      .from(Users)
      .where(eq(Users.id, id));

    if (user.length === 0) {
      throw new Error("Usuário não encontrado");
    }

    return user[0];
  }

  // Atualizar usuário
  static async updateUser(id: string, name: string, email: string) {
    const existingUser = await db.select().from(Users).where(eq(Users.id, id));

    if (existingUser.length === 0) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = await db
      .update(Users)
      .set({ name, email })
      .where(eq(Users.id, id))
      .returning();

    return {
      id: updatedUser[0].id,
      name: updatedUser[0].name,
      email: updatedUser[0].email,
      createdAt: updatedUser[0].createdAt,
      updatedAt: updatedUser[0].updatedAt,
    };
  }

  // Deletar usuário
  static async deleteUser(id: string) {
    const existingUser = await db.select().from(Users).where(eq(Users.id, id));

    if (existingUser.length === 0) {
      throw new Error("Usuário não encontrado");
    }

    const deletedUser = await db
      .delete(Users)
      .where(eq(Users.id, id))
      .returning();

    return deletedUser[0];
  }
}