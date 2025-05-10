import { ForecastItem as ForecastItemType } from "@/apis/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastItem } from "./ForecastItem";

interface DayForecastProps {
  date: string;
  items: ForecastItemType[];
}

export function DayForecast({ date, items }: DayForecastProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{formattedDate}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item) => (
            <ForecastItem key={item.dt} data={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
