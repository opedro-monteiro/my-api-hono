import { AppOpenAPI } from "@/lib/types.ts";
import denoJSON from "$/deno.json" with {type: "json"};
import {apiReference} from "@scalar/hono-api-reference"

export default function configureOpenAPI(app: AppOpenAPI) {
  // The OpenAPI documentation will be available at /doc
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: denoJSON.version,
      title: "Tasks API",
    },
  });

  app.get(
  '/reference', // interactive documentation is available here
  apiReference({
    theme: "kepler",
    layout: "classic", // or modern
    defaultHttpClient: {
        targetKey: "javascript", 
        clientKey: "fetch"
    },
    spec: {
      url: '/doc', // point to the endpoint where openAPI documentation lives
    },
  }),
)
}
