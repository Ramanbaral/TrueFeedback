import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";

type verifyCodeData = z.infer<typeof verifyCodeSchema>;

export async function POST(request: NextRequest) {
  try {
    const { code, username }: verifyCodeData = await request.json();
    const parseResult = verifyCodeSchema.safeParse({ code, username });
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Data",
        },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
      select: {
        verifyCode: true,
        verifyCodeExpiry: true,
      },
    });

    if (user.verifyCode === code && user.verifyCodeExpiry.getTime() > Date.now()) {
      await prisma.user.update({
        where: {
          username: username,
        },
        data: {
          isVerified: true,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "user verified successfully.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid verify code.",
      },
      { status: 400 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: "Error while verifying code",
      },
      { status: 500 }
    );
  }
}
