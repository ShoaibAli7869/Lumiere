import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const items = get().items;
        const exists = items.find((i) => i._id === product._id);
        if (exists) {
          set({
            items: items.map((i) =>
              i._id === product._id ? { ...i, qty: i.qty + qty } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty }] });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i._id !== id) }),

      updateQty: (id, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) => (i._id === id ? { ...i, qty } : i)),
        });
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((s, i) => s + i.price * i.qty, 0);
      },

      get count() {
        return get().items.reduce((s, i) => s + i.qty, 0);
      },
    }),
    { name: "cart-store" },
  ),
);
