"use client";

import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  initializeTheme: () => void;
  toggleTheme: () => void;
}

const THEME_KEY = "Vedic-theme-mode";

function applyTheme(darkMode: boolean) {
  document.documentElement.classList.toggle("dark", darkMode);
  document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  darkMode: false,
  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const savedTheme = window.localStorage.getItem(THEME_KEY);
    let darkMode: boolean;

    if (savedTheme === "dark" || savedTheme === "light") {
      darkMode = savedTheme === "dark";
    } else {
      // Migrate a preference saved by the previous Zustand persist store.
      const legacyValue = window.localStorage.getItem("Vedic-theme");
      let legacyDarkMode: boolean | undefined;
      try {
        legacyDarkMode = legacyValue
          ? (JSON.parse(legacyValue) as { state?: { darkMode?: boolean } }).state?.darkMode
          : undefined;
      } catch {
        legacyDarkMode = undefined;
      }
      darkMode = typeof legacyDarkMode === "boolean"
        ? legacyDarkMode
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (typeof legacyDarkMode === "boolean") {
        window.localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
      }
    }

    applyTheme(darkMode);
    set({ darkMode });
  },
  toggleTheme: () => {
    const darkMode = !get().darkMode;
    applyTheme(darkMode);
    window.localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
    set({ darkMode });
  },
}));
