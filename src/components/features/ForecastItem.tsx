import { ForecastItem as ForecastItemType } from '@/types/weatherResponse';
import { cn } from '@/utils/cn';
import { formatDateTime } from '@/utils/format';
import { WeatherIcon } from './WeatherIcon';

const WEATHER_MAPPINGS = {
  thunderstorm: 'Thunderstorm',
  drizzle: 'Drizzle',
  'light rain': 'Light rain',
  'heavy rain': 'Heavy rain',
  rain: 'Rain',
  snow: 'Snow',
  mist: 'Foggy',
  fog: 'Foggy',
  haze: 'Foggy',
  clear: 'Clear sky',
  'few cloud': 'Partly cloudy',
  'scattered cloud': 'Cloudy',
  'broken cloud': 'Overcast',
  'overcast cloud': 'Overcast',
  cloud: 'Cloudy',
};

const getReadableWeatherType = (description: string): string => {
  const match = Object.keys(WEATHER_MAPPINGS).find(key => description.includes(key));

  return match
    ? WEATHER_MAPPINGS[match as keyof typeof WEATHER_MAPPINGS]
    : description.charAt(0).toUpperCase() + description.slice(1);
};

interface ForecastItemProps {
  data: ForecastItemType;
  isFirst?: boolean;
  isLast?: boolean;
}

export function ForecastItem({ data, isFirst = false, isLast = false }: ForecastItemProps) {
  const weatherCondition = data.weather[0];
  const time = formatDateTime(data.dt);
  const maxTemp = Math.round(data.main.temp_max);
  const minTemp = Math.round(data.main.temp_min);

  const weatherType = getReadableWeatherType(weatherCondition.description);

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors',
        {
          'rounded-t': isFirst,
          'rounded-b': isLast,
        }
      )}
    >
      <div className="w-12 text-base font-medium text-gray-700">{time}</div>

      <div className="flex items-center">
        <WeatherIcon
          iconCode={weatherCondition.icon}
          size="sm"
          alt={weatherCondition.description}
        />
      </div>

      <div className="w-14 text-base text-center">
        <span className="text-gray-800">{maxTemp}°</span>
        <span className="text-gray-400 mx-1">/</span>
        <span className="text-gray-500">{minTemp}°</span>
      </div>

      <div
        className="w-24 sm:w-32 text-base text-right text-gray-600 truncate"
        title={weatherCondition.description}
      >
        {weatherType}
      </div>
    </div>
  );
}
