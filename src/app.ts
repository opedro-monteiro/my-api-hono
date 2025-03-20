import createApp from "@/lib/create-app.ts";
import configureOpenAPI from "@/lib/configure-open-api.ts";
import index from "@/routes/index.route.ts";
import tasks from "@/routes/tasks/tasks.index.ts";

const app = createApp();

const routes = [index, tasks];
configureOpenAPI(app);

routes.forEach((route) => app.route("/", route));

export default app;
