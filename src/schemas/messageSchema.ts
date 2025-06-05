import { z } from "zod/v4";

export const messageSchema = z.object({
  content: z.string().min(2, { error: "Message must be more than 2 characters long." }),
});
