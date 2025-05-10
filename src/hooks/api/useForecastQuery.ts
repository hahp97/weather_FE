import { weatherApi } from "@/apis/weather";
import { groupForecastByDay } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useForecastQuery(city: string) {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: async () => {
      const response = await weatherApi.getForecast(city);
      return response.data;
    },
    enabled: Boolean(city),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useGroupedForecastQuery(city: string) {
  return useQuery({
    queryKey: ["groupedForecast", city],
    queryFn: async () => {
      const response = await weatherApi.getForecast(city);
      const forecastData = response.data;
      return {
        ...forecastData,
        groupedByDay: groupForecastByDay(forecastData.list),
      };
    },
    enabled: Boolean(city),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
