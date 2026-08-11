import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full bg-[url('/movie-gridbg.JPG')] bg-cover bg-center relative flex items-center justify-center p-4 py-12">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/85 to-zinc-950/90 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-[480px] bg-zinc-950/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-zinc-800/80 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
            <p className="text-xs text-zinc-400 mt-1">Join MovieGrid for free today</p>
          </div>
          <Image src="/movie-grid logo1.png" alt="Logo" width={100} height={40} className="object-contain" />
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 w-full">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                name="userFullName"
                id="userFullName"
                autoComplete="name"
                required
                minLength={4}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white text-sm rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                required
                minLength={4}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white text-sm rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
              <input
                type="text"
                name="userLoginId"
                id="userLoginId"
                autoComplete="email"
                required
                minLength={4}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white text-sm rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                minLength={4}
                maxLength={60}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 text-white text-sm rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 transition-all placeholder:text-zinc-500"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400 mt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 bg-zinc-900 border-zinc-700 rounded focus:ring-0 accent-red-600 cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <a
              href="/auth/forgot-password"
              className="text-zinc-400 hover:text-red-400 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 transition-all text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/25 mt-2 cursor-pointer active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-4 my-1">
          <div className="h-px bg-zinc-800 flex-1" />
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Or Sign Up With
          </span>
          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-xl transition-all shadow-md text-sm text-zinc-200 font-medium cursor-pointer"
          >
            <FcGoogle size={22} />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 rounded-xl transition-all shadow-md text-sm text-zinc-200 font-medium cursor-pointer"
          >
            <FaGithub size={20} className="text-white" />
            <span>GitHub</span>
          </button>
        </div>

        <p className="text-xs text-zinc-400 text-center mt-2">
          Already a user of MovieGrid?{" "}
          <a href="/auth/login" className="text-white font-semibold hover:text-red-500 underline transition-colors">
            Sign in now
          </a>
        </p>
      </div>
    </div>
  );
}
