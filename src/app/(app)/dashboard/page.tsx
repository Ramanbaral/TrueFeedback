import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RefreshCwIcon } from "lucide-react";
import { PublicLink } from "./_components/PublicLink";
import { Feedbacks } from "./_components/Feedbacks";
import { FeedbackFallback } from "./_components/FeedbacksFallback";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Dashboard({ searchParams }: Props) {
  const session = await auth();
  const username = session?.user.username;
  if (!session) redirect("/sign-in");

  try {
    const page = searchParams.page || 1;

    return (
      <div>
        <p className="text-center text-primary text-3xl font-semibold my-6">Welcome, @{username}</p>

        <PublicLink username={username as string} />

        <Separator />

        <div className="m-4">
          <Button variant="secondary">
            <RefreshCwIcon /> Refresh
          </Button>
        </div>

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
