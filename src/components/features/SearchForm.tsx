import { weatherApi } from '@/apis/weather';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/routes/constants';
import { useCurrentLocationStore } from '@/store/currentLocationStore';
import { useSearchHistoryStore } from '@/store/searchStore';
import { searchSchema } from '@/validations/search';
import { ArrowRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  defaultValue?: string;
  compact?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function SearchForm({ defaultValue = '', compact = false, inputRef }: SearchFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToHistory } = useSearchHistoryStore();
  const { city, countryCode, setLocation } = useCurrentLocationStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const internalInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const actualInputRef = inputRef || internalInputRef;
  const searchQuery = searchParams.get('search');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: defaultValue,
    },
  });

  const locationValue = watch('location');

  // Auto-fill search input with current location or search query
  useEffect(() => {
    if (searchQuery) {
      setValue('location', searchQuery);
    } else if (city) {
      const currentLocation = countryCode ? `${city}, ${countryCode}` : city;
      setValue('location', currentLocation);
    }
  }, [city, countryCode, searchQuery, setValue]);

  const fetchLocationWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await weatherApi.getWeatherByCoords(latitude, longitude);
      const cityName = response.data.name;
      const countryCode = response.data.sys.country;

      setValue('location', `${cityName}, ${countryCode}`);
      setLocation(cityName, countryCode);
    } catch (error) {
      console.error('Error fetching location name:', error);
      setLocation('Singapore', 'SG');
      setValue('location', 'Singapore, SG');
    }
  };

  useEffect(() => {
    if (defaultValue === '' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          fetchLocationWeather(latitude, longitude);
        },
        error => {
          console.error('Geolocation error:', error);
          if (window.location.pathname !== ROUTES.SEARCH) {
            setLocation('Singapore', 'SG');
            setValue('location', 'Singapore, SG');
          }
        }
      );
    }
  }, [defaultValue, setValue, setLocation]);

  const onSubmit = async (data: SearchFormValues) => {
    const location = data.location.trim();
    setCityNotFound(false);
    setIsSearching(true);

    try {
      const response = await weatherApi.getCurrentWeather(location);

      addToHistory(location);

      const cityName = response.data.name;
      const countryCode = response.data.sys.country;
      setLocation(cityName, countryCode);

      navigate(`${ROUTES.HOME}?search=${encodeURIComponent(location)}`);

      if (compact) setIsExpanded(false);
    } catch (error) {
      console.error('Error searching for city:', error);
      setCityNotFound(true);

      if (compact) {
        setCityNotFound(true);
      } else {
        navigate(`${ROUTES.CITY_NOT_FOUND}?city=${encodeURIComponent(location)}`);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setValue('location', '');
    setCityNotFound(false);

    if (searchParams.has('search')) {
      const currentLocation = countryCode ? `${city}, ${countryCode}` : city;
      setValue('location', currentLocation);
      navigate(ROUTES.HOME);
    }

    if (actualInputRef) {
      actualInputRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  if (compact) {
    return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <div className="relative">
          {isExpanded ? (
            <div className="flex items-center">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Search for a city..."
                    aria-label="Enter location"
                    className="h-8 w-48 pl-7 pr-7 text-base rounded-full border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
                    ref={actualInputRef}
                    autoFocus
                  />
                )}
              />
              <MagnifyingGlassIcon className="h-3 w-3 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {locationValue && (
                <XMarkIcon
                  className="h-3 w-3 absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={handleClearSearch}
                />
              )}
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-8 w-8 p-0 hover:bg-transparent"
                disabled={isSubmitting || isSearching}
              >
                <ArrowRightIcon className="h-3 w-3 text-gray-500" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="text"
              onClick={() => setIsExpanded(true)}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <MagnifyingGlassIcon className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </form>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 flex-col">
        <div className="flex gap-2 relative">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter city or country name..."
                aria-label="Enter location"
                className={`flex-1 pl-8 ${
                  errors.location || cityNotFound
                    ? 'border-red-400 focus-visible:ring-red-400'
                    : 'border-gray-200'
                }`}
                ref={actualInputRef}
              />
            )}
          />
          <MagnifyingGlassIcon className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {locationValue && (
            <XMarkIcon
              className="h-4 w-4 cursor-pointer absolute right-26 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              onClick={handleClearSearch}
            />
          )}
          <Button
            type="submit"
            loadingText="Searching..."
            isLoading={isSubmitting || isSearching}
            disabled={isSubmitting || isSearching}
            className="bg-blue-500 hover:bg-blue-600 text-white transition-colors py-2 px-4 text-base font-medium rounded-md shadow-sm hover:shadow-md min-w-20"
          >
            Search
          </Button>
        </div>

        {errors.location && (
          <p className="text-base text-red-500 mt-1">{errors.location.message}</p>
        )}

        {cityNotFound && (
          <div className="text-base text-red-500 mt-1 p-2 bg-red-50 rounded-md">
            City not found. Please try again with a different city name or make sure you entered it
            correctly.
          </div>
        )}
      </form>
    </div>
  );
}
