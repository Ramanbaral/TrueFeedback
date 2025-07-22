import VerificationEmail from "../../../../emailTemplates/VerificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Raman <onboarding@truefeedback.ramanbaral.live>",
      to: ["ramanbaralofficial@gmail.com"],
      subject: "Hello world",
      react: VerificationEmail({ username: "sample", otp: "1234" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
