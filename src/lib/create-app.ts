import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { AppBindings } from "@/lib/types.ts";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook }); // To allow routes with a trailing "/""
}

export default function createApp() {
  const app = createRouter();

  app.notFound(notFound);
  app.onError(onError); // Stoker - shows a stacktrace if NODE_ENV !== "production"
  return app;
}
