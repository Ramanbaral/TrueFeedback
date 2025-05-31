import { z } from "zod/v4";

export const usernameValidation = z
  .string()
  .min(2, "username must be of minimum 2 characters")
  .max(20, "username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9-_.]+$/, "username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.email({ error: "Invalid Email" }),
  password: z.string().min(8, { error: "password must be atlest of length 8" }),
});
