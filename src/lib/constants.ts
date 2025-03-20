import { createMessageObjectSchema } from "stoker/openapi/schemas";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

// This schema specifically validates a message and has an example for not found
export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND
);
