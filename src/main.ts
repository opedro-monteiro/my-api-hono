import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Deno paradeiro!"));

Deno.serve({ port: 8787 }, app.fetch);
