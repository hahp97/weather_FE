import { weatherApi } from '@/apis/weather';
import { groupForecastByDay } from '@/utils/weather';
import { useQuery } from '@tanstack/react-query';

export function useForecastQuery(city: string) {
  return useQuery({
    queryKey: ['forecast', city],
    queryFn: async () => {
      const response = await weatherApi.getForecast(city);
      return response.data;
    },
    enabled: Boolean(city),
    staleTime: 5 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
}

export function useGroupedForecastQuery(city: string) {
  return useQuery({
    queryKey: ['groupedForecast', city],
    queryFn: async () => {
      const response = await weatherApi.getForecast(city);
      const forecastData = response.data;
      return {
        ...forecastData,
        groupedByDay: groupForecastByDay(forecastData.list),
      };
    },
    enabled: Boolean(city),
    staleTime: 5 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
