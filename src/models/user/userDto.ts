import { z } from "zod";

// DTO para representar um usuário completo (usado para retornos da API)
export const userSchemaDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  createdAt: z.string().datetime().default(new Date().toISOString()),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
});

export type UserDto = z.infer<typeof userSchemaDto>;
