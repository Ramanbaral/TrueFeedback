import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCwIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FeedbackCard } from "./_components/FeedbackCard";
import { Pagination } from "./_components/Pagination";

async function Dashboard() {
  const session = await auth();

  return (
    <div>
      {/* <p className='text-center text-3xl'>Welcome, {session?.user.username}</p> */}
      <p className="text-center text-primary text-3xl font-semibold my-6">Welcome, @ramanbaral</p>

      <div className="m-10 my-5">
        <p className="text-lg">Share your link and start receiving anonymous feedbacks</p>
        <div className="flex items-center gap-4">
          {/* link box */}
          <div className="my-4 py-2 px-4 border-2 border-gray-300 border-dashed rounded-md bg-accent">
            https://www.trueFeedback.com/u/ramanbaral
          </div>
          {/* copy button  */}
          <Button variant="default">
            <Copy /> Copy
          </Button>
        </div>
        {/* Message status toggle button  */}
        <div className="flex items-center gap-4">
          <Switch />
          <span className="text-lg">Accept Feedbacks: ON</span>
        </div>
      </div>

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
