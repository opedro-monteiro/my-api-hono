import createApp from "@/lib/create-app.ts";
import router from "@/routes/index.ts";
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware.ts";

const app = createApp();

app.use("*", cors());
app.route("/", router);
app.get("/", (c) => c.text("Hello World!"));

export default app;
