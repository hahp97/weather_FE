import { Card, CardContent } from '@/components/ui/card';
import { WeatherResponse } from '@/types/weatherResponse';
import { cn } from '@/utils/cn';
import { formatToday } from '@/utils/format';
import { WeatherIcon } from './WeatherIcon';
import { WindDirection } from './WindDirection';

interface CurrentWeatherProps {
  data: WeatherResponse;
  className?: string;
}

export function CurrentWeather({ data, className }: CurrentWeatherProps) {
  const formattedDate = formatToday('MMMM D, YYYY');
  const weatherCondition = data.weather[0];

  const actualTemp = Math.round(data.main.temp);
  const feelsLikeTemp = Math.round(data.main.feels_like);
  const tempDiff = feelsLikeTemp - actualTemp;
  const feelsLikeText =
    tempDiff === 0
      ? 'Same as actual'
      : tempDiff > 0
      ? `Feels ${tempDiff}° warmer`
      : `Feels ${Math.abs(tempDiff)}° colder`;

  return (
    <Card className={cn('bg-white shadow-md border-0 overflow-hidden', className)}>
      <CardContent className="p-0">
        {/* Main weather display */}
        <div className="p-6 bg-gradient-to-br from-white to-slate-50">
          <div className="flex justify-between items-center mb-6">
            <p className="text-base text-gray-500 font-medium">{formattedDate}</p>
            <div className="text-base text-gray-600 font-medium">
              {Math.floor(data.main.temp_min)}°C / {Math.ceil(data.main.temp_max)}°C
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <WeatherIcon
                iconCode={weatherCondition.icon}
                size="lg"
                alt={weatherCondition.description}
                className="w-20 h-20"
              />
              <div className="ml-4">
                <div className="text-6xl font-bold text-gray-800">{actualTemp}°C</div>
                <p className={cn('text-lg capitalize text-gray-600 mt-1 font-medium')}>
                  {weatherCondition.description}
                </p>
              </div>
            </div>

            <div className={cn('text-base text-gray-600 font-medium hidden sm:block')}>
              {feelsLikeText}
            </div>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white">
          <div className="flex flex-col items-center py-4">
            <p className="text-base text-gray-500 mb-1 font-medium">Humidity</p>
            <p className="text-lg font-bold text-gray-700">
              {data.main.humidity}
              <span className="text-base">%</span>
            </p>
          </div>

          <div className="flex flex-col items-center py-4">
            <p className="text-base text-gray-500 mb-1 font-medium">Wind</p>
            <WindDirection
              degrees={data.wind.deg}
              speed={data.wind.speed}
              compact={true}
              showDegrees={false}
            />
          </div>

          <div className="flex flex-col items-center py-4">
            <p className="text-base text-gray-500 mb-1 font-medium">Visibility</p>
            <p className="text-lg font-bold text-gray-700">
              {(data.visibility / 1000).toFixed(1)}
              <span className="text-base"> km</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
