import createApp from "@/lib/create-app.ts";
import router from "@/routes/index.ts";

const app = createApp();

app.route("/", router);
app.get("/", (c) => c.text("Hello World!"));

export default app;
