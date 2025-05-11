import { ROUTES } from '@/routes/constants';
import { cn } from '@/utils/cn';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

interface LocationDisplayProps {
  location: string;
  countryCode?: string;
  className?: string;
}

export function LocationDisplay({ location, countryCode, className }: LocationDisplayProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const displayText = searchQuery || (countryCode ? `${location}, ${countryCode}` : location);

  const handleSearchClick = () => {
    navigate(ROUTES.SEARCH);
  };

  return (
    <Link
      to={ROUTES.SEARCH}
      className={cn(
        'flex items-center text-base font-medium hover:text-blue-600 transition-colors',
        className
      )}
      title="Click to change location"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 mr-1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      <span>{displayText}</span>
      {window.location.pathname !== ROUTES.SEARCH && (
        <div className="flex items-center justify-center ml-2 gap-2">
          <span className="text-gray-400">|</span>
          <MagnifyingGlassIcon
            className="size-4 text-gray-600 cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
      )}
    </Link>
  );
}
