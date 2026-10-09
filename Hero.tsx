import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/app/lib/store/theme-store";

export default function Hero() {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-3 pb-2 md:px-38 py-20 bg-[#ececec] dark:bg-gray-900">
      <div
        className="mb-8 md:mb-0 flex justify-center md:hidden"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <Image
          src="/images/image2.png"
          alt="Ayurvedic Diet Illustration"
          width={290}
          height={290}
          priority
        />
      </div>

      <div
        className="max-w-xl space-y-6 text-center md:text-left"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug dark:text-white">
          Cloud-based Ayurvedic <br /> Diet Plan Recommendation System
        </h1>
        <p className="text-gray-600 text-lg dark:text-gray-300">
          Get personalized diet recommendations based on your unique body
          constitution
        </p>

        {/* Buttons container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/assessment"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/Dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Dashboard
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            aria-pressed={darkMode}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-400 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>

      <div
        className="hidden md:flex md:ml-10"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <Image
          src="/images/image2.png"
          alt="Ayurvedic Diet Illustration"
          width={410}
          height={410}
          priority
        />
      </div>
    </section>
  );
}
