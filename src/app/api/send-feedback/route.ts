import { NextRequest, NextResponse } from "next/server";
import { messageSchema } from "@/schemas/messageSchema";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parseResult = messageSchema.safeParse(data);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "data validation failed.",
        },
        { status: 403 }
      );
    }

    const { content, username } = data;

    //first check if user isAcceptingMessage
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not accepting Feedbacks currently.",
        },
        { status: 200 }
      );
    }

    await prisma.message.create({
      data: {
        content: content,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "message submitted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "error creating message.",
      },
      { status: 500 }
    );
  }
}
