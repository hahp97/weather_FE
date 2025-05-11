import _ from 'lodash';

interface Env {
  OPENWEATHER_API_KEY: string;
  ENCRYPTION_SECRET: string;
  NODE_ENV: string;
  BASE_URL: string;
}

const getEnvVariable = (key: keyof Env): string => {
  const value = import.meta.env[`VITE_${key}`];

  if (!value && _.isEqual(import.meta.env.MODE, 'production') && key !== 'ENCRYPTION_SECRET') {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value || '';
};

export const env = {
  OPENWEATHER_API_KEY: getEnvVariable('OPENWEATHER_API_KEY'),
  ENCRYPTION_SECRET: getEnvVariable('ENCRYPTION_SECRET') || 'weather-app-default-secret-key-2025',
  NODE_ENV: import.meta.env.MODE || 'development',
  BASE_URL: getEnvVariable('BASE_URL') || 'https://api.openweathermap.org/data/2.5',
};

export const checkApiKey = (): boolean => {
  const apiKey = env.OPENWEATHER_API_KEY;
  if (_.isEmpty(apiKey)) {
    console.error(
      'OpenWeather API key is missing. Please add it to your .env file as VITE_OPENWEATHER_API_KEY=your_api_key_here'
    );
    return false;
  }

  if (_.isEqual(apiKey, 'your_api_key_here')) {
    console.warn(
      'You are using the placeholder API key. Please replace it with your actual API key.'
    );
    return false;
  }

  return true;
};

export default env;
