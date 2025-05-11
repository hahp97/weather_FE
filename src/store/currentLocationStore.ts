import { secureLocalStorage } from '@/lib/secureStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CurrentLocationState {
  city: string;
  countryCode: string;
  setLocation: (city: string, countryCode: string) => void;
}

export const useCurrentLocationStore = create<CurrentLocationState>()(
  persist(
    set => ({
      city: 'Singapore',
      countryCode: 'SG',

      setLocation: (city: string, countryCode: string) => set({ city, countryCode }),
    }),
    {
      name: 'current-location',
      storage: createJSONStorage(() => secureLocalStorage),
    }
  )
);
