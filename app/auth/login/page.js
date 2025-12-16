import { redirect } from "next/navigation";
import LoginFormClient from "@/components/LoginFormClient"; // client component for OAuth buttons
import { auth } from "@/auth"; // use the exported auth function

export default async function LoginPage() {
  // Server-side session check
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div
      className="
        h-auto 
        w-full 
        bg-cover 
        bg-center 
        bg-no-repeat 
        pb-25 
        bg-[url('/movie-gridbg.JPG')]
      "
    >
      <div className="flex justify-between w-full">
       
          <style>
            {`
              @media (max-width: 600px) {
                #responsive-img {
                  width: 100px !important;
                  height: auto !important;
                }
              }
            `}
          </style>
         < div className="flex justify-between w-full">
          <img
            id="responsive-img"
            src="/movie-gridbg.JPG"
            alt="image"
            width={200}
            height={100}
          />
          <img
            id="responsive-img"
            src="/movie-gridbg.JPG"
            alt="image"
            width={200}
            height={100}
          />
          </div>
        
      </div>

      <div className="w-full flex justify-center items-center pb-25">
        <div className="w-130 min-h-screen bg-black/50 p-10 rounded-lg pb-25">
          <h2 className="text-3xl text-gray-300 font-bold mb-5">Login</h2>

          {/* Traditional email/password login form */}
          <form>
            <div className="flex flex-col gap-6 w-full">
              <input
                type="text"
                name="userLoginId"
                id="userLoginId"
                autoComplete="email"
                required
                minLength={4}
                className="w-full px-4 py-3 bg-[#333] text-sm text-white rounded-md focus:outline-none"
                placeholder="Email or phone number"
              />

              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                minLength={4}
                maxLength={60}
                className="w-full px-4 py-3 bg-[#333] text-sm text-white rounded-md focus:outline-none"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <div className="flex items-center justify-between text-gray-300 text-sm mt-10">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-[#333] border border-gray-600 rounded-sm focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="/auth/forgot-password"
                  className="text-gray-300 hover:underline hover:text-gray-200"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-md"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center text-gray-300 my-4">OR login with</p>

          {/* Client-side OAuth buttons */}
          <LoginFormClient />

          <p className="text-gray-400 text-sm text-center mt-4">
            New to MovieGrid?{" "}
            <a href="/auth/signup" className="text-white hover:underline">
              Sign Up now.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
