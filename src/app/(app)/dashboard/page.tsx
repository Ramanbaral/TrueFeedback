"use client";

import { useSession } from "next-auth/react";
import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { PublicLink } from "./_components/PublicLink";
import { Feedbacks } from "./_components/Feedbacks";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { data: session } = useSession();

  const username = session?.user.username;

  return (
    <div>
      {username && (
        <p className="text-center text-primary text-3xl font-semibold my-6">Welcome, @{username}</p>
      )}
      {username === undefined ? (
        <Skeleton className="m-5 w-2xl h-[150px]"></Skeleton>
      ) : (
        <PublicLink username={username as string} />
      )}

      <Separator />

      {/* feedbacks boxes */}
      <Suspense>
        <Feedbacks />
      </Suspense>
    </div>
  );
}

export default Dashboard;
