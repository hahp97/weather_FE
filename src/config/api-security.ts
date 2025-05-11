// API key security utilities
import env from './env';

const generateKeyHash = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
};

export const validateApiKey = (): boolean => {
  const apiKey = env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    return false;
  }

  if (apiKey.length !== 32) {
    console.warn('API key has unexpected length');
  }

  const storedHash = localStorage.getItem('_wapi_hash');
  const currentHash = generateKeyHash(apiKey);

  if (storedHash && storedHash !== currentHash) {
    console.warn('API key integrity check failed');
    return false;
  }

  localStorage.setItem('_wapi_hash', currentHash);

  return true;
};

export const getSecureApiKey = (): string => {
  // Decode key parts (simple obfuscation)
  const parts = [
    env.OPENWEATHER_API_KEY.substring(0, 8),
    env.OPENWEATHER_API_KEY.substring(8, 16),
    env.OPENWEATHER_API_KEY.substring(16, 24),
    env.OPENWEATHER_API_KEY.substring(24, 32),
  ];

  return parts.join('');
};
