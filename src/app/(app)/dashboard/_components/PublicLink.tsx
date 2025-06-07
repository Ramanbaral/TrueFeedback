"use client";
import { Copy, CopyCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

type FormValues = {
  feedbacks: boolean;
};

export function PublicLink({ username }: { username: string }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(false);

  async function copyLink() {
    setIsLinkCopied(true);
    await navigator.clipboard.writeText(`https://www.trueFeedback.com/u/${username}`);
  }

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      feedbacks: false,
    },
  });

  useEffect(() => {
    async function getAcceptFeedbackStatus() {
      try {
        const { data } = await axios.get("api/accept-feedbacks", {
          params: {
            username: username,
          },
        });
        if (data.isAcceptingFeedback) {
          setValue("feedbacks", true);
          setFeedbackStatus(true);
        }
      } catch (error) {
        console.log("Error Fetching User status ", error);
        toast.error("Unable to fetch Accept Feedbacks Status.");
      }
    }
    getAcceptFeedbackStatus();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await axios.post("/api/accept-feedbacks", {
        acceptFeedbacks: data.feedbacks,
      });
      if (res.data.success) {
        if (data.feedbacks) toast.success("Feedbacks On");
        else toast.success("Feedbacks OFF");
      }
    } catch {
      toast.error("Error Updating Accept Feedback status");
      console.log("Can't update feedback accept status.");
      setValue("feedbacks", !data.feedbacks);
      setFeedbackStatus(!data.feedbacks);
    }
  };

  return (
    <div className="m-10 my-5">
      <p className="text-lg">Share your link and start receiving anonymous feedbacks</p>
      <div className="flex items-center gap-4">
        {/* link box */}
        <div className="my-4 py-2 px-4 border-2 border-gray-300 border-dashed rounded-md bg-accent">
          {`https://www.trueFeedback.com/u/${username}`}
        </div>
        {/* copy button  */}
        <Button variant="default" onClick={copyLink}>
          {isLinkCopied ? (
            <>
              <CopyCheck /> Copied
            </>
          ) : (
            <>
              <Copy /> Copy
            </>
          )}
        </Button>
      </div>
      {/* Message status toggle button  */}
      <div className="flex items-center gap-4">
        <Controller
          name="feedbacks"
          control={control}
          render={({ field }) => (
            <Switch
              id="feedbacks"
              checked={field.value}
              onCheckedChange={checked => {
                setFeedbackStatus(checked);
                field.onChange(checked);
                handleSubmit(onSubmit)();
              }}
            />
          )}
        />
        <span className="text-lg">Accept Feedbacks: {feedbackStatus ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}
