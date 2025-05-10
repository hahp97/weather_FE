import { weatherApi } from "@/apis/weather";
import { useQuery } from "@tanstack/react-query";

export function useWeatherQuery(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => weatherApi.getCurrentWeather(city).then((res) => res.data),
    enabled: Boolean(city),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useWeatherByCoordinates(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () =>
      weatherApi.getWeatherByCoords(lat!, lon!).then((res) => res.data),
    enabled: Boolean(lat) && Boolean(lon),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
