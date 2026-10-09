import type { Metadata } from "next";
import "./globals.css";
import AOSProvider from "./components/AOSProvider";
import { QueryProvider } from "./lib/query-client";
import ThemeSync from "./components/ThemeSync";
import AuthSync from "./components/AuthSync";

export const metadata: Metadata = {
  title: "Vedic AI - A comprehensive Ayurvedic Diet Plan Recommender",
  description: "Personalized Ayurvedic Diet Plan Recommendation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <QueryProvider>
          <ThemeSync />
          <AuthSync />
          <AOSProvider>{children}</AOSProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
