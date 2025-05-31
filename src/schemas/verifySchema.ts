import { z } from "zod/v4";

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { error: "OTP should be of length 6." })
    .regex(/^\d+$/, { error: "only digits are allowed." }),
});
