import { Card, CardAction, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import formatDate from "@/helpers/formatDate";

export function FeedbackCard({ content, date }: { content: string; date: Date }) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="">
        <ScrollArea className="max-h-25">
          <p className="text-lg max-h-25">{content}</p>
        </ScrollArea>
        <span className="text-sm">{formatDate(date)}</span>
        <CardAction>
          <div className="text-destructive">
            <Trash2 />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
