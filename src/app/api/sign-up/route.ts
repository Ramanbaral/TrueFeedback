import { z } from "zod/v4";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schemas/signUpSchema";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

type SignUpData = z.infer<typeof signUpSchema>;

export async function POST(request: Request) {
  try {
    const userData: SignUpData = await request.json();

    const parseResult = signUpSchema.safeParse(userData);
    if (!parseResult.success) {
      //data validation failed
      // console.log(parseResult.error);
      return Response.json(
        {
          success: false,
          message: "Invalid data",
        },
        { status: 403 }
      );
    }

    const userByEmail = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    const userByUsername = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });

    //email and username doesn't exists condition - create new user
    if (userByEmail === null && userByUsername === null) {
      const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
      const verifyCodeExpiry = new Date(Date.now() + 3600000);
      const hashedPwd = await bcrypt.hash(userData.password, 10);

      await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hashedPwd,
          verifyCode: verifyCode,
          verifyCodeExpiry: verifyCodeExpiry,
        },
      });

      sendVerificationEmail(userData.email, userData.username, verifyCode);

      return Response.json(
        {
          success: true,
          message: "New User Account Created.",
        },
        { status: 200 }
      );
    }

    //accond already exists with given username or email - terminate
    else if (
      (userByEmail !== null && userByEmail.isVerified === true) ||
      (userByUsername !== null && userByUsername.isVerified === true)
    ) {
      return Response.json(
        {
          success: false,
          message: "Account already exists.",
        },
        { status: 400 }
      );
    }

    //email exists but not verified condition - update with new data
    else if (userByEmail !== null && userByEmail.isVerified === false) {
      const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
      const verifyCodeExpiry = new Date(Date.now() + 3600000);
      const hashedPwd = await bcrypt.hash(userData.password, 10);

      await prisma.user.update({
        where: {
          email: userByEmail.email,
        },
        data: {
          verifyCode: verifyCode,
          verifyCodeExpiry: verifyCodeExpiry,
          password: hashedPwd,
        },
      });

      // sendVerificationEmail(userData.email, userByEmail.username, verifyCode);

      return Response.json(
        {
          success: true,
          message: "User Created.",
        },
        { status: 200 }
      );
    }

    //username exists but not verified condition - update with new data
    else if (userByUsername !== null && userByUsername.isVerified === false) {
      const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString();
      const verifyCodeExpiry = new Date(Date.now() + 3600000);
      const hashedPwd = await bcrypt.hash(userData.password, 10);

      await prisma.user.update({
        where: {
          username: userByUsername.username,
        },
        data: {
          email: userData.email,
          verifyCode: verifyCode,
          verifyCodeExpiry: verifyCodeExpiry,
          password: hashedPwd,
        },
      });

      // sendVerificationEmail(userData.email, userData.username, verifyCode);

      return Response.json(
        {
          success: true,
          message: "User Created.",
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Problem creating user.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Error in user registration.", error);
    return Response.json(
      {
        success: false,
        message: "Error in user registration.",
      },
      { status: 500 }
    );
  }
}
