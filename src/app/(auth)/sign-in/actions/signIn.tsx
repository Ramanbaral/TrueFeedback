"use server";
import { signIn } from "@/auth";

export default async function SignIn(username: string, password: string) {
  const result = await signIn("credentials", {
    username: username,
    password: password,
    redirect: false,
  });
  return result;
}

export async function GoogleSignIn() {
  "use server";
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}
