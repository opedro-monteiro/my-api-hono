import app from "@/app.ts";
import env from "@/env.ts";

// Change from default of 8000
Deno.serve({ port: env.PORT }, app.fetch);
