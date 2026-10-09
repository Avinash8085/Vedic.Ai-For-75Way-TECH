"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "../types";

interface AuthState {
  token: string | null;
  role: UserRole | null;
  hydrated: boolean;
  setAuth: (token: string, role: UserRole) => void;
  logout: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      hydrated: false,
      setAuth: (token, role) => set({ token, role }),
      logout: () => set({ token: null, role: null }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "Vedic-auth",
      skipHydration: true,
      partialize: ({ token, role }) => ({ token, role }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  )
);
