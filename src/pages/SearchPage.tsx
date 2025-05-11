import { SearchForm } from '@/components/features/SearchForm';
import { SearchHistory } from '@/components/features/SearchHistory';
import { useCurrentLocationStore } from '@/store/currentLocationStore';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SearchPage() {
  const searchFormRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const { city, countryCode } = useCurrentLocationStore();

  // Get search query from URL or use current location
  const searchQuery = searchParams.get('search');
  const defaultSearchValue = searchQuery || (countryCode ? `${city}, ${countryCode}` : city);

  useEffect(() => {
    if (searchFormRef.current) {
      setTimeout(() => {
        searchFormRef.current?.focus();
      }, 100);
    }
  }, []);

  return (
    <div>
      <div className="space-y-6">
        {/* Search form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-700">Search Location</h2>
          </div>
          <div className="pl-2">
            <SearchForm defaultValue={defaultSearchValue} inputRef={searchFormRef} />
          </div>
        </div>

        {/* Search history */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-700">Search History</h2>
          </div>
          <div className="pl-2">
            <SearchHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
