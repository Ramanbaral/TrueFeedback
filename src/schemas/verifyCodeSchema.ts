import { z } from "zod/v4";
import { usernameValidation } from "./signUpSchema";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6, { error: "OTP should be of length 6." })
    .regex(/^\d+$/, { error: "only digits are allowed." }),
  username: usernameValidation,
});
