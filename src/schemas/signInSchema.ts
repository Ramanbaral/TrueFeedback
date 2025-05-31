import { z } from "zod/v4";
import { usernameValidation } from "./signUpSchema";

export const signInSchema = z.object({
  id: usernameValidation,
  password: z.string().min(8, { error: "password must be atlest of length 8" }),
});
