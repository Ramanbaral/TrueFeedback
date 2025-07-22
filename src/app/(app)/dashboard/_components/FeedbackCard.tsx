"use client";

import { Trash2 } from "lucide-react";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatDate from "@/helpers/formatDate";

export function FeedbackCard({
  id,
  content,
  date,
  deleteFeedback,
}: {
  id: string;
  content: string;
  date: Date;
  deleteFeedback: (id: string) => Promise<void>;
}) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="">
        <ScrollArea className="max-h-25">
          <p className="text-lg max-h-25">{content}</p>
        </ScrollArea>
        <span className="text-sm">{formatDate(new Date(date))}</span>
        <CardAction>
          <div className="text-destructive">
            <Trash2
              onClick={() => {
                deleteFeedback(id);
              }}
            />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
