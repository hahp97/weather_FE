import dayjs from 'dayjs';
import _ from 'lodash';

export function formatTemperature(temp: number): string {
  return `${_.round(temp)}°C`;
}

export function formatDateTime(timestamp: number): string {
  return dayjs(timestamp * 1000).format('HH:mm');
}

export function formatDate(date: Date | number | string, format: string = 'MMMM D, YYYY'): string {
  return dayjs(date).format(format);
}

export function formatToday(format: string = 'MMMM D, YYYY'): string {
  return dayjs().format(format);
}

export function formatDayOfWeek(date: Date | number | string): string {
  return dayjs(date).format('dddd');
}

export function formatDateShort(date: Date | number | string): string {
  return dayjs(date).format('MMM D');
}
