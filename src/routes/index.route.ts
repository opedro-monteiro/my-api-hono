import { createRouter } from "@/lib/create-app.ts";
import { createRoute } from "@hono/zod-openapi";
// import { z } from "zod";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

// Raw way
// const router = createRouter().openapi(
//   createRoute({
//     method: "get",
//     path: "/",
//     responses: {
//       // how the path is going to respond
//       // keys are the http status codes
//       200:  {
//         content: {
//           "application/json": {
//             schema: z.object({
//               // schema is a zod validator that specifies how this thing is going to respond
//               message: z.string(),
//             }),
//           },
//         },
//         description: "Tasks API Index",
//       },
//     },
//   }),
//   (c) => {
//     // this handler will be typed to respond like the above
//     return c.json({ message: "Welcome to Tasks!" }); // ctrl+space and it will show the options (like "message" here)
//   }
// );

// With jsonContent helper from the stoker library
const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      // how the path is going to respond
      // keys are the http status codes
      [HttpStatusCodes.OK]: jsonContent(
        // z.object({
        //   // schema is a zod validator that specifies how this thing is going to respond
        //   message: z.string(),
        // }),
        createMessageObjectSchema("Tasks API"),
        "Tasks API Index"
      ),
    },
  }),
  (c) => {
    // this handler will be typed to respond like the above
    return c.json({ message: "Welcome to Tasks!" }, HttpStatusCodes.OK); // ctrl+space and it will show the options (like "message" here)
  }
);

export default router;
