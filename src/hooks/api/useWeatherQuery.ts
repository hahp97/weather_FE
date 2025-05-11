import { weatherApi } from '@/apis/weather';
import { useQuery } from '@tanstack/react-query';

export function useWeatherQuery(city: string) {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => weatherApi.getCurrentWeather(city).then(res => res.data),
    enabled: Boolean(city),
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useWeatherByCoordinates(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['weather', 'coordinates', lat, lon],
    queryFn: () => weatherApi.getWeatherByCoords(lat!, lon!).then(res => res.data),
    enabled: Boolean(lat) && Boolean(lon),
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
