import { LocationDisplay } from '@/components/features/LocationDisplay';
import { useToast } from '@/context/toastContext';
import { ROUTES } from '@/routes/constants';
import { useCurrentLocationStore } from '@/store/currentLocationStore';
import { cn } from '@/utils/cn';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function Header() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { city, countryCode } = useCurrentLocationStore();
  const toast = useToast();
  const hasSearchFilter = searchParams.has('search');
  const searchQuery = searchParams.get('search');

  const handleTitleClick = (e: React.MouseEvent) => {
    if (pathname === ROUTES.HOME && hasSearchFilter) {
      e.preventDefault();

      toast.info(`Removed search filter${searchQuery ? `: ${searchQuery}` : ''}`);

      navigate(ROUTES.HOME);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 md:py-4 sticky top-0 z-40 shadow-md">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className={cn(
            'font-semibold text-lg flex items-center',
            hasSearchFilter && pathname === ROUTES.HOME ? 'text-blue-700' : 'text-blue-600'
          )}
          onClick={handleTitleClick}
          title={hasSearchFilter && pathname === ROUTES.HOME ? 'Click to clear search filter' : ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2 text-yellow-500"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.758a.75.75 0 001.06-1.061l-1.59-1.591a.75.75 0 00-1.061 1.06l1.591 1.591z" />
          </svg>
          <span className="hidden sm:inline">Weather App</span>
          <span className="sm:hidden">Weather</span>

          {hasSearchFilter && pathname === ROUTES.HOME && (
            <span
              className={cn('ml-2 text-base bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full')}
            >
              Filtered
            </span>
          )}
        </Link>

        <div className="ml-auto">
          <LocationDisplay
            location={city}
            countryCode={countryCode}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
