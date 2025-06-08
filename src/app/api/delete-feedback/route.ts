import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const userId = session?.user._id;
  console.log(userId);

  const { id } = await request.json();
  try {
    await prisma.message.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback removed.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "erorr deleting feedback",
      },
      { status: 500 }
    );
  }
}
