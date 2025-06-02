import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  try {
    const messages = await prisma.message.findMany({
      where: {
        userId: user?._id,
      },
    });
    console.log(messages);
    return NextResponse.json({
      success: true,
      message: "succesfully fetched messages.",
      messages: messages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "error retriving messages.",
      },
      { status: 500 }
    );
  }
}
