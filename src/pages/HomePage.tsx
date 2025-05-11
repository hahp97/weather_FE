import { CurrentWeather } from '@/components/features/CurrentWeather';
import { DayForecast } from '@/components/features/DayForecast';
import { validateApiKey } from '@/config/api-security';
import { useToast } from '@/context/toastContext';
import { useGroupedForecastQuery } from '@/hooks/api/useForecastQuery';
import { useWeatherByCoordinates, useWeatherQuery } from '@/hooks/api/useWeatherQuery';
import { useCurrentLocationStore } from '@/store/currentLocationStore';
import { useGeoLocationStore } from '@/store/geoLocationStore';
import { useSearchHistoryStore } from '@/store/searchStore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const queryCity = searchParams.get('search') || '';
  const { addToHistory } = useSearchHistoryStore();
  const { city, countryCode, setLocation } = useCurrentLocationStore();

  const {
    latitude,
    longitude,
    city: geoCity,
    countryCode: geoCountryCode,
    isGeolocationEnabled,
    isGeolocationLoading,
    setGeoLocation,
    setLocationInfo,
    setGeolocationStatus,
    setGeolocationLoading,
  } = useGeoLocationStore();

  const toast = useToast();
  const [initialLoad, setInitialLoad] = useState(true);

  const isApiKeyValid = validateApiKey();

  const { data: weatherByCoords, isLoading: isLoadingCoords } = useWeatherByCoordinates(
    latitude || undefined,
    longitude || undefined
  );

  useEffect(() => {
    if (weatherByCoords && initialLoad && isGeolocationEnabled) {
      const cityName = weatherByCoords.name;
      const countryCode = weatherByCoords.sys.country;

      // Update both stores
      setLocation(cityName, countryCode);
      setLocationInfo(cityName, countryCode);

      addToHistory(`${cityName}, ${countryCode}`);
      setInitialLoad(false);
    }
  }, [
    weatherByCoords,
    initialLoad,
    addToHistory,
    toast,
    setLocation,
    setLocationInfo,
    isGeolocationEnabled,
  ]);

  useEffect(() => {
    if (!isApiKeyValid) {
      toast.warning('API key is not configured properly. Please check your .env file.', {
        duration: 6000,
      });
    }
  }, [isApiKeyValid, toast]);

  useEffect(() => {
    if (queryCity) {
      addToHistory(queryCity);

      const parts = queryCity.split(',');
      const cityName = parts[0].trim();
      const countryCode = parts.length > 1 ? parts[1].trim() : '';

      setLocation(cityName, countryCode);
      setInitialLoad(false);
      return;
    }

    if (navigator.geolocation && initialLoad) {
      setGeolocationLoading(true);

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setGeoLocation(latitude, longitude);
          setGeolocationLoading(false);
        },
        error => {
          console.error('Error getting location:', error);
          toast.info('Unable to determine your location. Using default location.');

          setGeolocationStatus(false);
          setGeolocationLoading(false);
          setLocation(geoCity, geoCountryCode);
          addToHistory(`${geoCity}${geoCountryCode ? `, ${geoCountryCode}` : ''}`);
          setInitialLoad(false);
        }
      );
    } else if (initialLoad && !city) {
      setLocation(geoCity, geoCountryCode);
      addToHistory(`${geoCity}${geoCountryCode ? `, ${geoCountryCode}` : ''}`);
      setInitialLoad(false);
    } else if (!queryCity && !initialLoad) {
      if (isGeolocationEnabled && latitude && longitude) {
        console.log('Reverting to geolocation after clearing search');
        if (geoCity && geoCountryCode) {
          setLocation(geoCity, geoCountryCode);
        }
      } else {
        console.log('Using default location after clearing search:', geoCity, geoCountryCode);
        setLocation(geoCity, geoCountryCode);
      }
    }
  }, [
    queryCity,
    addToHistory,
    initialLoad,
    city,
    countryCode,
    setLocation,
    toast,
    latitude,
    longitude,
    geoCity,
    geoCountryCode,
    setGeoLocation,
    setGeolocationStatus,
    setGeolocationLoading,
    isGeolocationEnabled,
  ]);

  const currentCityQuery = `${city}${countryCode ? `, ${countryCode}` : ''}`;

  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeatherQuery(currentCityQuery);

  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    error: forecastError,
    refetch: refetchForecast,
  } = useGroupedForecastQuery(currentCityQuery);

  const isLoading =
    isLoadingWeather || isLoadingForecast || isLoadingCoords || isGeolocationLoading;

  useEffect(() => {
    if (isLoading || !city) return;

    const updateData = async () => {
      try {
        await Promise.all([refetchWeather(), refetchForecast()]);
      } catch (error) {
        console.error('Error updating weather data:', error);
      }
    };

    if (!isLoading && weatherData && !forecastData?.groupedByDay) {
      updateData();
    }

    const intervalId = setInterval(updateData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isLoading, city, refetchWeather, refetchForecast, weatherData, forecastData]);

  useEffect(() => {
    if (weatherError) {
      toast.error('Unable to load weather data. Please try again later.');
    }
    if (forecastError) {
      toast.error('Unable to load forecast data. Please try again later.');
    }
  }, [weatherError, forecastError, toast]);

  return (
    <>
      {!isApiKeyValid ? (
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
              className="text-blue-600 hover:underline"
            >
              OpenWeather
            </a>
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white rounded-lg shadow-sm">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-blue-100 h-16 w-16 mb-4"></div>
            <div className="h-6 bg-blue-100 rounded w-40 mb-3"></div>
            <div className="h-4 bg-blue-50 rounded w-32"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current weather section */}
          {weatherData && <CurrentWeather data={weatherData} />}

          {/* 5-Day forecast section - always display this section when loaded */}
          <div>
            <h2 className="text-base font-semibold mb-4 text-gray-700 border-b border-gray-100 pb-2">
              5-Day Forecast
            </h2>
            {forecastData?.groupedByDay ? (
              <div className="space-y-4">
                {forecastData.groupedByDay.map((day, index) => (
                  <DayForecast
                    key={day.date}
                    date={day.date}
                    items={day.items}
                    isToday={index === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                Loading forecast data...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
