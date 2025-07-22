import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { ZodError } from "zod/v4";
import { prisma } from "@/lib/prisma";
import type { User } from "./generated/prisma";
import { signInSchema } from "./schemas/signInSchema";

export async function getUserByUsernameOrEmail(usernameOrEmail: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: usernameOrEmail,
          },
        },
        {
          username: {
            equals: usernameOrEmail,
          },
        },
      ],
    },
  });

  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials): Promise<User | null> => {
        try {
          let user: User | null = null;

          const { username, password } = await signInSchema.parseAsync(credentials);

          user = await getUserByUsernameOrEmail(username);

          if (!user) {
            throw new Error("Invalid credentials.");
          } else if (user.isVerified == false) {
            throw new Error("Please verify your account.");
          } else {
            const isPwdCorrect = await bcrypt.compare(password, user.password);
            if (!isPwdCorrect) {
              throw new Error("Invalid credentials username or password not matched.");
            }
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log("Data validation Failed.");
            return null;
          }
          return null;
        }
      },
    }),
    // Google,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
