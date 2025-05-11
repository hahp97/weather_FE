import { CityNotFoundPage } from '@/pages/CityNotFoundPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SearchPage } from '@/pages/SearchPage';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />
      <Route path={ROUTES.CITY_NOT_FOUND} element={<CityNotFoundPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
