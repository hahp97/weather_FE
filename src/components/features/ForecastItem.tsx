import { ForecastItem as ForecastItemType } from '@/apis/types';
import { formatDateTime, formatTemperature } from '@/lib/utils';
import { WeatherIcon } from './WeatherIcon';

interface ForecastItemProps {
  data: ForecastItemType;
}

export function ForecastItem({ data }: ForecastItemProps) {
  const weatherCondition = data.weather[0];
  const time = formatDateTime(data.dt);
  const maxTemp = formatTemperature(data.main.temp_max);
  const minTemp = formatTemperature(data.main.temp_min);

  return (
    <div className="flex items-center justify-between p-3 border-b [&:last-child]:border-b-0">
      <div className="w-16 text-sm font-medium">{time}</div>

      <div className="flex items-center">
        <WeatherIcon
          iconCode={weatherCondition.icon}
          size="sm"
          alt={weatherCondition.description}
        />
      </div>

      <div className="w-24 text-sm text-center">
        {maxTemp} / {minTemp}
      </div>

      <div className="w-36 text-sm text-right capitalize">{weatherCondition.description}</div>
    </div>
  );
}
