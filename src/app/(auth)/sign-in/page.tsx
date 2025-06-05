import { MessageSquare } from "lucide-react";
import { LoginForm } from "./login-form";

function SignIn() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          TrueFeedback
        </a>
        <LoginForm />
      </div>
    </div>
  );
}

export default SignIn;
