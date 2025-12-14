import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="
    h-auto 
    w-full 
    bg-cover 
    bg-center 
    bg-no-repeat 
    pb-25 
    bg-[url('/movie-gridbg.JPG')]
  ">
      <div className="flex justify-between w-full">
       <Image
        src="/movie-gridbg.JPG"
        alt="image"
        width={200} 
        height={100}/>

         <Image
        src="/movie-gridbg.JPG"
        alt="image"
        width={200} 
        height={100}/>
      </div>

     <div className="w-full flex justify-center items-center pb-25 ">
        <div className="w-130 h-150 bg-black/50 p-10 rounded-lg">
          <h2 className="text-3xl text-gray-300 font-bold mb-5">Sign Up</h2>
            <form>
                <div className="flex flex-col gap-6 w-full">
                    <input
                        type="text"
                        name="userFullName"
                        id="userFullName"
                        autoComplete="fullname"
                        required
                        minLength={4}
                        className="w-full px-4 py-3 bg-[#333] text-sm text-white rounded-md focus:outline-none"
                        placeholder="Enter your fullname"
                    />

                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        autoComplete="current-phone"
                        required
                        minLength={4}
                        className="w-full px-4 py-3 bg-[#333] text-sm text-white rounded-md focus:outline-none"
                        placeholder="Enter your firstname"
                    />


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
                            <div className="flex items-center justify-between text-gray-300 text-sm mt-15">

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
                                Sign Up
                            </button>
                            
                            <p className="text-center">OR signup with</p>
                            <div className="w-full flex items-center justify-center gap-2">
                                <button className="cursor-pointer"><FcGoogle size="30" /></button>
                                <button className="cursor-pointer"><FaGithub size="28" /></button>
                            </div>

                            <p className="text-gray-400 text-sm text-center">
                                Already a user of MovieGrid?{" "}
                                <a href="/auth/signup" className="text-white hover:underline">
                                Login now.
                                </a>
                            </p>

                            </div>
                                        

            </form>
        </div>
      </div>
    </div>
  );
}