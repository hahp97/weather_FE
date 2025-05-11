import { secureLocalStorage } from '@/lib/secureStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
  city: string;
  countryCode: string;

  isGeolocationEnabled: boolean;
  isGeolocationLoading: boolean;

  setGeoLocation: (latitude: number, longitude: number) => void;
  setLocationInfo: (city: string, countryCode: string) => void;
  setGeolocationStatus: (isEnabled: boolean) => void;
  setGeolocationLoading: (isLoading: boolean) => void;
  resetToDefault: () => void;
}

const DEFAULT_CITY = 'Singapore';
const DEFAULT_COUNTRY_CODE = 'SG';

export const useGeoLocationStore = create<GeoLocationState>()(
  persist(
    set => ({
      latitude: null,
      longitude: null,
      city: DEFAULT_CITY,
      countryCode: DEFAULT_COUNTRY_CODE,
      isGeolocationEnabled: false,
      isGeolocationLoading: false,

      setGeoLocation: (latitude: number, longitude: number) =>
        set({ latitude, longitude, isGeolocationEnabled: true }),

      setLocationInfo: (city: string, countryCode: string) => set({ city, countryCode }),

      setGeolocationStatus: (isEnabled: boolean) => set({ isGeolocationEnabled: isEnabled }),

      setGeolocationLoading: (isLoading: boolean) => set({ isGeolocationLoading: isLoading }),

      resetToDefault: () =>
        set({
          city: DEFAULT_CITY,
          countryCode: DEFAULT_COUNTRY_CODE,
          latitude: null,
          longitude: null,
          isGeolocationEnabled: false,
        }),
    }),
    {
      name: 'geo-location',
      storage: createJSONStorage(() => secureLocalStorage),
    }
  )
);
