export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  NOT_FOUND: '/404',
  CITY_NOT_FOUND: '/city-not-found',

  // Helper function to create route with parameters
  withParams: (route: string, params: Record<string, string>) => {
    let result = route;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  },
};
