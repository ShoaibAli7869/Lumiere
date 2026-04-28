import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [], // product IDs — local optimistic

      isWishlisted: (id) => get().ids.includes(id),

      toggle: async (productId) => {
        const ids = get().ids;
        const added = !ids.includes(productId);
        // optimistic
        set({
          ids: added ? [...ids, productId] : ids.filter((i) => i !== productId),
        });
        try {
          await api.post(`/wishlist/${productId}`);
        } catch {
          // revert
          set({ ids });
        }
      },

      syncFromServer: async () => {
        try {
          const { data } = await api.get("/wishlist");
          set({ ids: data.wishlist.map((p) => p._id || p) });
        } catch {}
      },
    }),
    { name: "wishlist-store" },
  ),
);
