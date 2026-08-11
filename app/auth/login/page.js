import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import LoginFormClient from "@/components/LoginFormClient";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-[url('/movie-gridbg.JPG')] bg-cover bg-center relative flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-zinc-950/90 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-[440px] bg-zinc-950/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-zinc-800/80 shadow-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-zinc-400">
            Sign in to continue watching on MovieGrid
          </p>
        </div>

        {/* Credentials login form */}
        <LoginForm />

        <div className="flex items-center gap-4 my-1">
          <div className="h-px bg-zinc-800 flex-1" />
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Or Sign In With
          </span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        {/* OAuth buttons */}
        <LoginFormClient />

        <p className="text-xs text-zinc-400 text-center mt-2">
          New to MovieGrid?{" "}
          <a href="/auth/signup" className="text-white font-semibold hover:text-red-500 underline transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
