"use client";
import { signIn } from "next-auth/react"; 
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginFormClient() {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={() => signIn("Google")}
        type="button"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-xl transition-all shadow-md text-sm text-zinc-200 font-medium cursor-pointer"
      >
        <FcGoogle size={22} />
        <span>Google</span>
      </button>

      <button
        onClick={() => signIn("Github")}
        type="button"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-xl transition-all shadow-md text-sm text-zinc-200 font-medium cursor-pointer"
      >
        <FaGithub size={20} className="text-white" />
        <span>GitHub</span>
      </button>
    </div>
  );
}
