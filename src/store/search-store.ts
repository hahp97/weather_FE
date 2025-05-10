import _ from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistoryState {
  history: string[];
  addToHistory: (city: string) => void;
  removeFromHistory: (city: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],

      addToHistory: (city: string) =>
        set((state) => {
          // Remove duplicates and add to the beginning
          const filteredHistory = _.filter(
            state.history,
            (item) => !_.isEqual(item.toLowerCase(), city.toLowerCase())
          );
          return {
            history: _.take([city, ...filteredHistory], 10), // Keep only 10 recent searches using lodash
          };
        }),

      removeFromHistory: (city: string) =>
        set((state) => ({
          history: _.filter(
            state.history,
            (item) => !_.isEqual(item.toLowerCase(), city.toLowerCase())
          ),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "search-history",
    }
  )
);
