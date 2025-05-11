import type { ForecastItem } from '@/types/weatherResponse';
import dayjs from 'dayjs';
import _ from 'lodash';

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = _.round((degrees % 360) / 45) % 8;
  return directions[index];
}

export function groupForecastByDay(forecastList: ForecastItem[]) {
  const grouped = _.groupBy(forecastList, item => {
    return dayjs(item.dt * 1000).format('YYYY-MM-DD');
  });

  return _.map(grouped, (items, date) => ({
    date,
    items,
  }));
}
