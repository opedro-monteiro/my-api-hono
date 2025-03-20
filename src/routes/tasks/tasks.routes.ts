import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  insertTasksSchema,
  patchTasksSchema,
  selectTasksSchema,
} from "@/db/schema.ts";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { notFoundSchema } from "@/lib/constants.ts";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      // z.array(z.object({ name: z.string(), done: z.boolean() })),
      z.array(selectTasksSchema),
      "The list of tasks"
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  tags,
  // Used to validate the incoming request body
  // When we get a post request with a json object that has a name and a done property we have to validate that before inserting it into tht database
  request: {
    // We want to validate the incoming request body
    // The way you specify this is almost exactly the same as the way you specify the responses
    // There's a helper in the stoker library that creates the same json content but also adds a required field. For the specific endpoint we want to make sure that the user is always specifying data in the body. If they are not then it should be invalid.
    body: jsonContentRequired(insertTasksSchema, "The task to create"), // we need the insertSchema for this
    // body: jsonContentRequired(
    //   z.object({ name: z.string(), done: z.boolean() }),
    //   "The task to create"
    // ), // we need the insertSchema for this
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema, // After creating the task respond with the task that was created
      "The created task "
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)"
    ),
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  tags,
  // Validator for id
  // Validate if its a number or a uuid, etc
  // It prevents the handler from running if an invalid id was sent in
  request: {
    params: IdParamsSchema, // We are using id params schema from stoker. The id is used as number here
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The requested task"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      // z.object({ message: z.string() }).openapi({
      //   // We are documenting it with openapi example
      //   example: { message: "Not found" },
      // }),
      notFoundSchema,
      "Task not found"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  tags,
  // Validate the params as well as the incoming request body
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, "The task updates"), // we need the insertSchema for this
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema, // After creating the task respond with the task that was created
      "The updated task "
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    // There are two possible validation errors
    // Its possible that the id is invalid, but its also possible that the data they sent us in the body is invalid
    // We need to specify the response for UNPROCESSABLE_ENTITY can be one of either of those two
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)"
    ),
  },
});

// "delete" is a reserved word
export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  tags,
  // Validate the params as well as the incoming request body
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "Task deleted" },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
