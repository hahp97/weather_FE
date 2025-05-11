import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastItem as ForecastItemType } from '@/types/weatherResponse';
import { cn } from '@/utils/cn';
import { formatDateShort, formatDayOfWeek } from '@/utils/format';
import { ForecastItem } from './ForecastItem';

interface DayForecastProps {
  date: string;
  items: ForecastItemType[];
  isToday?: boolean;
  className?: string;
}

export function DayForecast({ date, items, isToday = false, className }: DayForecastProps) {
  const dayOfWeek = formatDayOfWeek(date);
  const shortDate = formatDateShort(date);
  const formattedDate = `${dayOfWeek}, ${shortDate}`;

  return (
    <Card className={cn('bg-white shadow-md border-0', className)}>
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className={cn('text-base font-medium text-gray-800')}>
            {isToday ? 'Today' : formattedDate}
          </CardTitle>
          <div className="text-base text-gray-500 font-medium">
            {Math.round(Math.min(...items.map(item => item.main.temp_min)))}° /
            {Math.round(Math.max(...items.map(item => item.main.temp_max)))}°
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => (
            <ForecastItem
              key={item.dt}
              data={item}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
