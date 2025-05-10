import type { ForecastItem } from '@/apis/types';
import { type ClassValue, clsx } from 'clsx';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTemperature(temp: number): string {
  return `${_.round(temp)}°C`;
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = _.round((degrees % 360) / 45) % 8;
  return directions[index];
}

export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function groupForecastByDay(forecastList: ForecastItem[]) {
  const grouped = _.groupBy(forecastList, item => {
    const date = new Date(item.dt * 1000);
    return date.toISOString().split('T')[0];
  });

  return _.map(grouped, (items, date) => ({
    date,
    items,
  }));
}
