"use client";
import { signIn } from "next-auth/react"; // <-- use this
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginFormClient() {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button onClick={() => signIn("Google")}>
        <FcGoogle size={30} />
      </button>
      <button onClick={() => signIn("Github")}>
        <FaGithub size={28}
        color='white' />
      </button>
    </div>
  );
}
