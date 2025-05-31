import { resend } from "@/lib/resend";
import VerificationEmail from "../../emailTemplates/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "OTP",
      react: VerificationEmail({ username: username, otp: verifyCode }),
    });

    if (error) {
      return { success: false, message: "Failed to send verification email." };
    }
    return { success: true, message: "Verification email sent." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send verification email." };
  }
}
