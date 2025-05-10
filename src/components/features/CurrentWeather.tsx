import { WeatherResponse } from "@/apis/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatTemperature } from "@/lib/utils";
import { WeatherIcon } from "./WeatherIcon";
import { WindDirection } from "./WindDirection";

interface CurrentWeatherProps {
  data: WeatherResponse;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const weatherCondition = data.weather[0];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <h2 className="text-2xl font-semibold mt-1">
            {data.name}, {data.sys.country}
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center">
          <WeatherIcon
            iconCode={weatherCondition.icon}
            size="lg"
            alt={weatherCondition.description}
          />
          <div className="text-5xl font-bold my-2">
            {formatTemperature(data.main.temp)}
          </div>
          <p className="text-lg capitalize mb-4">
            {weatherCondition.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="text-lg font-medium">{data.main.humidity} %</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Wind</p>
            <WindDirection degrees={data.wind.deg} speed={data.wind.speed} />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Visibility</p>
            <p className="text-lg font-medium">
              {(data.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
