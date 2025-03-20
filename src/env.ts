import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"), 
  PORT: z.coerce.number().default(3333), 
  DATABASE_URL: z.string().url(),
});


export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse({
    NODE_ENV: Deno.env.get("NODE_ENV"),
    PORT: Deno.env.get("PORT"),
    DATABASE_URL: Deno.env.get("DATABASE_URL"),
  });
} catch (e) {
  const error = e as ZodError;
  console.error("❌ Invalid env");
  console.error(error.flatten().fieldErrors);
  Deno.exit();
}

export default env;
