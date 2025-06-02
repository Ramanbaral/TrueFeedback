import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "user not authentication",
      },
      { status: 401 }
    );
  }
  const userId = user?._id;
  const { acceptMessages } = await request.json();

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isAcceptingMessage: acceptMessages,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "accepting messages status changed.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to update status",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username: username as string,
      },
      select: {
        isAcceptingMessage: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "succesfully retrived status",
        isAcceptingMessage: user.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to retrive user",
      },
      { status: 500 }
    );
  }
}
