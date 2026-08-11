"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const email = e.target.userLoginId.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="userLoginId"
            required
            className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500 text-sm"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500 text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs font-semibold bg-red-950/60 border border-red-800/60 p-3 rounded-xl text-center">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 transition-all text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/25 mt-2 cursor-pointer active:scale-[0.99]"
      >
        Sign In
      </button>
    </form>
  );
}
