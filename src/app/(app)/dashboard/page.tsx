"use client";

import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RefreshCwIcon } from "lucide-react";
import { PublicLink } from "./_components/PublicLink";
import { Feedbacks } from "./_components/Feedbacks";
import { FeedbackFallback } from "./_components/FeedbacksFallback";
import { Skeleton } from "@/components/ui/skeleton";

//make Dashbaord a client comp and get user inf and useSearchParams to get page info
function Dashboard() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  try {
    const { data: session, status } = useSession();

    const username = session?.user.username;

    return (
      <div>
        {username && (
          <p className="text-center text-primary text-3xl font-semibold my-6">
            Welcome, @{username}
          </p>
        )}
        {username === undefined ? (
          <Skeleton className="m-5 w-2xl h-[150px]"></Skeleton>
        ) : (
          <PublicLink username={username as string} />
        )}

        <Separator />

        {/* feedbacks boxes */}
        <Suspense fallback={<FeedbackFallback />}>
          <Feedbacks page={page as number} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

export default Dashboard;
