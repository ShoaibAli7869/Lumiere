import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token, isLoggedIn: true });
      },

      register: async (name, email, password) => {
        const { data } = await api.post("/auth/register", {
          name,
          email,
          password,
        });
        localStorage.setItem("token", data.token);
        set({ user: data.user, token: data.token, isLoggedIn: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isLoggedIn: false });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-store",
      partialize: (s) => ({
        user: s.user,
        token: s.token,
        isLoggedIn: s.isLoggedIn,
      }),
    },
  ),
);
