"use client";
import { Pagination } from "./Pagination";
import { FeedbackCard } from "./FeedbackCard";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import axios from "axios";
import { Message } from "@/generated/prisma";
import { useState, useEffect } from "react";
import { FeedbackFallback } from "./FeedbacksFallback";
import { toast } from "sonner";

export function Feedbacks({ page }: { page: number }) {
  const [fetchingFeedbacks, setFetchingFeedbacks] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Message[]>([]);
  const [totalFeedbackCount, setTotalFeedbackCount] = useState<number | null>(null);

  async function deleteFeedback(id: string) {
    try {
      const response = await axios.delete("/api/delete-feedback", {
        data: {
          id: id,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setFeedbacks(prevState => prevState.filter(item => item.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Problem Removing Feedback");
    }
  }

  async function getFeedbacks(page: number) {
    try {
      setFetchingFeedbacks(true);
      const res = await axios.get<{ feedbacks: Message[] }>(`/api/get-feedbacks?page=${page}`);
      setFeedbacks(res.data.feedbacks);
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingFeedbacks(false);
    }
  }

  async function getFeedbacksCount() {
    try {
      const res = await axios.get<{ totalCount: number }>(`/api/count-total-feedback`);
      setTotalFeedbackCount(res.data.totalCount);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getFeedbacks(page);
    getFeedbacksCount();
  }, []);

  useEffect(() => {
    getFeedbacks(page);
  }, [page]);

  return (
    <>
      <div className="m-4">
        <Button
          variant="secondary"
          onClick={() => {
            setFeedbacks([]);
            getFeedbacks(page);
            getFeedbacksCount();
          }}
        >
          <RefreshCwIcon /> Refresh
        </Button>
      </div>
      {fetchingFeedbacks && <FeedbackFallback></FeedbackFallback>}

      {feedbacks.length === 0 && !fetchingFeedbacks && (
        <p className="text-center text-accent-foreground"> You have 0 Feedbacks.</p>
      )}

      <div className="m-10 my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks?.map(feedback => (
          <FeedbackCard
            key={feedback.id}
            id={feedback.id}
            content={feedback.content}
            date={feedback.createdAt}
            deleteFeedback={deleteFeedback}
          />
        ))}
      </div>

      {(totalFeedbackCount ?? 1) > 9 && (
        <Pagination curPage={page} totalPage={Math.ceil((totalFeedbackCount ?? 1) / 9)} />
      )}
    </>
  );
}
