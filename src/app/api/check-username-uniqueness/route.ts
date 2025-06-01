import { z } from "zod/v4";
import { NextRequest, NextResponse } from "next/server";
import { usernameValidation } from "@/schemas/signUpSchema";
import { prisma } from "@/lib/prisma";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");
    const queryParam = {
      username: username,
    };

    //validate username
    const parseResult = usernameQuerySchema.safeParse(queryParam);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "username validation failed.",
        },
        { status: 403 }
      );
    }

    const existingVerifiedUser = await prisma.user.findUnique({
      where: {
        username: username as string,
        isVerified: {
          equals: true,
        },
      },
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "username already taken.",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: true,
          message: "username available.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while checking username uniqueness. " + error,
      },
      { status: 500 }
    );
  }
}
