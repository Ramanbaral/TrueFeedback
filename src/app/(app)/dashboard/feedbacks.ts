import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const session = await auth();

export async function getFeedbacks(page: number) {
  const skipItem = (page - 1) * 9;
  return await prisma.message.findMany({
    skip: skipItem,
    take: 9,
    where: {
      userId: session?.user?._id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function countFeedbacks() {
  return await prisma.message.count({
    where: {
      userId: session?.user?._id,
    },
  });
}
