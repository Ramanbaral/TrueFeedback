"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

interface IFormInput {
  content: string;
}

export default function Message() {
  const [isSending, setIsSending] = useState(false);
  const { username } = useParams<{ username: string }>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      setIsSending(true);

      const response = await axios.post("/api/send-feedback", {
        username: username,
        content: data.content,
      });

      if (response.data.success) {
        toast.success(`Feedback Submitted to @${username}`);
      } else {
        toast.warning(response.data.message);
      }
      setValue("content", "");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <p className="text-4xl text-primary m-8 text-center font-medium">
        Welcome to{" "}
        <Link href="/" className="cursor-pointer">
          TrueFeedback
        </Link>
      </p>
      <div className="flex flex-col items-center justify-center gap-4 mx-50 ">
        <p className="">
          Send Anonymous Feedback to <b>@{username}</b>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[80vw] lg:w-[50vw]">
            <Textarea
              placeholder="Type your feedback here."
              {...register("content", { required: true, minLength: 10 })}
            />
            {errors.content && (
              <p className="text-destructive m-2">Feedback should be more than 10 characters.</p>
            )}
          </div>
          <Button type="submit" variant="default" className="cursor-pointer mt-5">
            {isSending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent black-blue-500"></div>
            ) : (
              "Send Feedback"
            )}
          </Button>
        </form>
      </div>
      <Separator className="my-5" />
      <div className="my-10 grid place-content-center">
        <Link href="/sign-up">
          <Button className="cursor-pointer">Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
