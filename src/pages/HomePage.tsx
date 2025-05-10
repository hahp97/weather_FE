import { CurrentWeather } from '@/components/features/CurrentWeather';
import { DayForecast } from '@/components/features/DayForecast';
import { SearchForm } from '@/components/features/SearchForm';
import { checkApiKey } from '@/config/env';
import { useToast } from '@/context/toast-context';
import { useGroupedForecastQuery } from '@/hooks/api/useForecastQuery';
import { useWeatherQuery } from '@/hooks/api/useWeatherQuery';
import { useSearchHistoryStore } from '@/store/search-store';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const queryCity = searchParams.get('q') || '';
  const [city, setCity] = useState(queryCity);
  const { addToHistory } = useSearchHistoryStore();
  const toast = useToast();

  // Check if API key is available
  const isApiKeyValid = checkApiKey();

  // Show warning if API key is missing or using placeholder
  useEffect(() => {
    if (!isApiKeyValid) {
      toast.warning('API key is not configured properly. Please check your .env file.', {
        duration: 6000,
      });
    }
  }, [isApiKeyValid, toast]);

  useEffect(() => {
    if (queryCity) {
      setCity(queryCity);
      return;
    }

    if (navigator.geolocation && !city) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setCity('London');
          addToHistory('London');
        },
        error => {
          console.error('Error getting location:', error);
          setCity('London');
          addToHistory('London');
        }
      );
    } else if (!city) {
      setCity('London');
      addToHistory('London');
    }
  }, [queryCity, addToHistory, city]);

  useEffect(() => {
    if (queryCity) {
      setCity(queryCity);
      addToHistory(queryCity);
    }
  }, [queryCity, addToHistory]);

  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
  } = useWeatherQuery(city);

  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    error: forecastError,
  } = useGroupedForecastQuery(city);

  useEffect(() => {
    if (weatherError) {
      toast.error('Failed to fetch weather data');
    }
    if (forecastError) {
      toast.error('Failed to fetch forecast data');
    }
  }, [weatherError, forecastError, toast]);

  const isLoading = isLoadingWeather || isLoadingForecast;

  if (!isApiKeyValid) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-4">
          <h2 className="text-lg font-semibold mb-2">API Key Not Configured</h2>
          <p>
            The OpenWeather API key is not properly configured. Please add your API key to the{' '}
            <code className="bg-yellow-100 px-1 py-0.5 rounded">.env</code> file:
          </p>
          <pre className="bg-yellow-100 p-2 rounded mt-2 overflow-x-auto">
            VITE_OPENWEATHER_API_KEY=your_api_key_here
          </pre>
          <p className="mt-2">
            You can get an API key from{' '}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 [&:hover]:underline"
            >
              OpenWeather
            </a>
          </p>
        </div>

        <div className="mb-6">
          <SearchForm defaultValue={city} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <SearchForm defaultValue={city} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-lg">Loading weather data...</p>
        </div>
      )}

      {!isLoading && weatherData && (
        <div className="mb-6">
          <CurrentWeather data={weatherData} />
        </div>
      )}

      {!isLoading && forecastData?.groupedByDay && (
        <div>
          <h2 className="text-2xl font-bold mb-4">5-day Forecast</h2>
          {forecastData.groupedByDay.map(day => (
            <DayForecast key={day.date} date={day.date} items={day.items} />
          ))}
        </div>
      )}
    </div>
  );
}
