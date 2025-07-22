import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async function () {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "user not authenticated",
        },
        { status: 401 }
      );
    }

    const userId = session?.user._id;
    const totalCount = await prisma.message.count({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "succesfully fetched feedbacks count.",
        totalCount,
      },
      { status: 200 }
    );
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
};
