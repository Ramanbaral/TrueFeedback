"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  const { username } = useParams<{ username: string }>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/verify-code", {
        username: username,
        code: otp,
      });

      if (res.data.success) {
        setIsVerified(true);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would call your resend OTP API here
      console.log("Resending OTP...");
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    router.replace("/sign-in");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Account</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit verification code to your email address. Enter the code below
            to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium text-gray-700 block text-center">
                Verification Code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={value => {
                    setOtp(value);
                    setError("");
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">{"Didn't receive the code?"}</p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-sm"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">Code expires in 30 minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
