import { weatherApi } from '@/apis/weather';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetchWeather() {
  const queryClient = useQueryClient();

  return {
    prefetchWeather: async (city: string) => {
      const cachedData = queryClient.getQueryData(['weather', city]);
      if (cachedData) return;

      await queryClient.prefetchQuery({
        queryKey: ['weather', city],
        queryFn: () => weatherApi.getCurrentWeather(city).then(res => res.data),
        staleTime: 10 * 60 * 1000,
        gcTime: 60 * 60 * 1000, // 1 hour
      });

      await queryClient.prefetchQuery({
        queryKey: ['groupedForecast', city],
        queryFn: async () => {
          const response = await weatherApi.getForecast(city);
          return response.data;
        },
        staleTime: 30 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000, // 2 hours
      });
    },
  };
}
