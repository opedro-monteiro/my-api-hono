import app from "@/app.ts";
import env from "@/env.ts";

Deno.serve({ port: Number(env.PORT) }, app.fetch);
