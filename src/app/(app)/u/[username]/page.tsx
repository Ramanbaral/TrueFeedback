"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function Message() {
  const { username } = useParams<{ username: string }>();

  return (
    <div>
      <p className="text-4xl text-primary m-8 text-center font-medium">Welcome to TrueFeedback</p>
      <div className="flex flex-col items-center justify-center gap-4 mx-50 ">
        <p className="">
          Send Anonymous Feedback to <b>@{username}</b>
        </p>
        <div className="w-[80vw] lg:w-[50vw]">
          <Textarea placeholder="Type your feedback here." />
        </div>
        <Button variant="default" className="">
          Send Feedback
        </Button>
      </div>
      <Separator className="my-5" />
      <div className="my-10 grid place-content-center">
        <Link href="/sign-up">
          <Button>Create Your Accound</Button>
        </Link>
      </div>
    </div>
  );
}
