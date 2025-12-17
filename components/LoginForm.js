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
    <form onSubmit={handleLogin}>
      <div className="flex flex-col gap-6 w-full">
        <input
          type="email"
          name="userLoginId"
          required
          className="w-full px-4 py-3 bg-[#333] text-white rounded-md"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 bg-[#333] text-white rounded-md"
          placeholder="Password"
        />
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-md mt-6"
      >
        Login
      </button>
    </form>
  );
}
