import { pinoLogger as logger } from "hono-pino";
import { pino } from "pino";
import pretty from "pino-pretty";
import env from "@/env.ts";

export function pinoLogger() {
  return logger({
    pino: pino(
      env.NODE_ENV === "production" ? undefined : pretty()
    ),
    http: {
      reqId: () => crypto.randomUUID(), // reqId in the log output will be a uuid instead of it just counting up
    },
  });
}
