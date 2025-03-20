import {
  ListRoute,
  CreateRoute,
  GetOneRoute,
  PatchRoute,
  RemoveRoute,
} from "@/routes/tasks/tasks.routes.ts";
import { AppRouteHandler } from "@/lib/types.ts";
import db from "@/db/index.ts";
import { tasks } from "@/db/schema.ts";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { eq } from "drizzle-orm";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  // Get access to the vaidated data
  const task = c.req.valid("json"); // We can pass in the thing we are looking for, the "json" data that was sent to our server
  //@ts-ignore ––Library related error
  const [inserted] = await db.insert(tasks).values(task).returning(); // "returning" will give back the inserted task
  // [inserted] to destructre it so that we get only the first inserted value
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  // const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  // OR
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  // If task is undefined
  // if (!task) return c.json({ message: "Not found" }, HttpStatusCodes.NOT_FOUND);
  if (!task)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  // const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  // OR
  // const task = await db.query.tasks.findFirst({
  //   where(fields, operators) {
  //     return operators.eq(fields.id, id);
  //   },
  // });

  const [task] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  // If task is undefined – i.e., not found in the db
  if (!task)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  // const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  // OR
  // const task = await db.query.tasks.findFirst({
  //   where(fields, operators) {
  //     return operators.eq(fields.id, id);
  //   },
  // });

  const result = await db.delete(tasks).where(eq(tasks.id, id));
  console.log(result);

  // With result we should be able to see the number of rows modified. If that is 0, then the task was not found.
  if (result.rowCount === 0)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  // If its deleted, respond with nothing
  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
