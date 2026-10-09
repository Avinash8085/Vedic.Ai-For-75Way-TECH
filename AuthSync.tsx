"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/lib/store/auth-store";

export default function AuthSync() {
  useEffect(() => {
    void Promise.resolve(useAuthStore.persist.rehydrate()).catch(() => {
      useAuthStore.getState().setHydrated(true);
    });
  }, []);

  return null;
}
