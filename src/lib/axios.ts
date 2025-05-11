import { getSecureApiKey, validateApiKey } from '@/config/api-security';
import env from '@/config/env';
import axios from 'axios';

validateApiKey();

const apiClient = axios.create({
  baseURL: env.BASE_URL,
  params: {
    appid: getSecureApiKey(),
    units: 'metric',
  },
});

apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized - API key may be invalid');
          break;
        case 404:
          console.error('Location not found');
          break;
        case 429:
          console.error('Rate limit exceeded');
          break;
        default:
          console.error(`Error: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('No response received', error.request);
    } else {
      console.error('Error setting up request', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
