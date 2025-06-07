import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FeedbackCard } from "./_components/FeedbackCard";
import { RefreshCwIcon } from "lucide-react";
import { Pagination } from "./_components/Pagination";
import { PublicLink } from "./_components/PublicLink";

async function Dashboard() {
  const session = await auth();
  const username = session?.user.username;
  if (!session) redirect("/sign-in");

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
      <div className="m-10 my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting. I like your rolex watch but don't just wear it in meeting. It's distracting. I like your rolex watch but don't just wear it in meeting. It's distracting. I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
        <FeedbackCard
          content="I like your rolex watch but don't just wear it in meeting. It's distracting."
          date={new Date()}
        />
      </div>

      <Pagination curPage={1} totalPage={5} />
    </div>
  );
}

export default Dashboard;
