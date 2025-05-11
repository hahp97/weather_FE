import apiClient from '@/lib/axios';
import type { ForecastResponse, WeatherResponse } from '@/types/weatherResponse';

export const weatherApi = {
  getCurrentWeather: (city: string) =>
    apiClient.get<WeatherResponse>('/weather', {
      params: { q: city },
    }),

  getForecast: (city: string) =>
    apiClient.get<ForecastResponse>('/forecast', {
      params: { q: city },
    }),

  getWeatherByCoords: (lat: number, lon: number) =>
    apiClient.get<WeatherResponse>('/weather', {
      params: { lat, lon },
    }),

  getForecastByCoords: (lat: number, lon: number) =>
    apiClient.get<ForecastResponse>('/forecast', {
      params: { lat, lon },
    }),
};
