import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async function (req: NextRequest) {
  //user is undefined not able to get session (fetches all the requests of all the users)
  const session = await auth();
  console.log(session);
  const user = session?.user;
  // console.log(user)

  try {
    const messages = await prisma.message.findMany({
      where: {
        userId: user?._id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "succesfully fetched feedbacks.",
        feedbacks: messages,
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
