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

    const { content } = data.content;
    const userid = request.nextUrl.searchParams.get("userid");

    //first check if user isAcceptingMessage
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userid as string,
      },
    });

    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "user is not accepting any message currently.",
        },
        { status: 400 }
      );
    }

    await prisma.message.create({
      data: {
        content: content,
        userId: userid as string,
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
