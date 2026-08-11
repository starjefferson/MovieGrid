"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="w-48">
              <img src="/movie-grid logo1.png" alt="MovieGrid Logo" className="h-auto w-full object-contain" />
            </div>

            <p className="text-sm leading-relaxed text-zinc-300 max-w-sm">
              Discover movies faster with MovieGrid — your sleek, modern gateway to endless entertainment. Smooth browsing, powerful search, and a stylish cinematic experience.
            </p>

            <div className="flex items-center gap-3 mt-2">
              {["twitter", "facebook", "instagram", "github"].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-sm"
                >
                  <span className="capitalize text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Company
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Features</a></li>
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Works</a></li>
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Support
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Customer Support</a></li>
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="/dashboard" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100">
              Newsletter
            </h4>
            <p className="text-xs text-zinc-400">
              Get weekly recommendations directly in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} MovieGrid. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-zinc-300 font-medium">TMDB API & MovieGrid</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
