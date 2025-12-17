import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import LoginFormClient from "@/components/LoginFormClient";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[url('/movie-gridbg.JPG')] bg-cover bg-center">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[420px] bg-black/70 p-10 rounded-lg">
          <h2 className="text-3xl text-gray-300 font-bold mb-6">Login</h2>

          {/* Credentials login */}
          <LoginForm />

          <p className="text-center text-gray-300 my-4">OR login with</p>

          {/* OAuth buttons */}
          <LoginFormClient />

          <p className="text-gray-400 text-sm text-center mt-4">
            New to MovieGrid?{" "}
            <a href="/auth/signup" className="text-white hover:underline">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
