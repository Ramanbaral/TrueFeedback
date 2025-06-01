import { z } from "zod/v4";
import { usernameValidation } from "./signUpSchema";

export const signInSchema = z.object({
  username: usernameValidation,
  password: z
    .string()
    .min(8, { error: "Password must be more than 8 characters" })
    .max(32, "Password must be less than 32 characters"),
});
