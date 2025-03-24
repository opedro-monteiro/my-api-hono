import app from "@/app.ts";
import env from "@/env.ts";

Deno.serve({ port: env.PORT }, app.fetch);
