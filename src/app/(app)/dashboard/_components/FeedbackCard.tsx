"use client";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatDate from "@/helpers/formatDate";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

async function deleteFeedback(id: string, router: AppRouterInstance) {
  try {
    const response = await axios.delete("/api/delete-feedback", {
      data: {
        id: id,
      },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      router.refresh();
    }
  } catch (error) {
    console.log(error);
    toast.error("Problem Removing Feedback");
  }
}

export function FeedbackCard({ id, content, date }: { id: string; content: string; date: Date }) {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="">
        <ScrollArea className="max-h-25">
          <p className="text-lg max-h-25">{content}</p>
        </ScrollArea>
        <span className="text-sm">{formatDate(date)}</span>
        <CardAction>
          <div className="text-destructive">
            <Trash2
              onClick={() => {
                deleteFeedback(id, router);
              }}
            />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
