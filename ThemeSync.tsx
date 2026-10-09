"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/app/lib/store/theme-store";

export default function ThemeSync() {
  useEffect(() => {
    const theme = useThemeStore.getState();
    theme.initializeTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("Vedic-theme-mode") === null) {
        document.documentElement.classList.toggle("dark", event.matches);
        document.documentElement.style.colorScheme = event.matches ? "dark" : "light";
        useThemeStore.setState({ darkMode: event.matches });
      }
    };

    mediaQuery.addEventListener("change", syncSystemTheme);
    return () => mediaQuery.removeEventListener("change", syncSystemTheme);
  }, []);

  return null;
}
