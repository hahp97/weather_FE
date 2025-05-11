import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes/constants';
import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center p-4 py-8 bg-gradient-to-b from-blue-50 to-gray-50'
      )}
    >
      <div
        className={cn(
          'max-w-md w-full bg-white shadow-xl rounded-xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300'
        )}
      >
        <div className="bg-blue-600 h-2"></div>
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className={cn('rounded-full bg-red-100 p-5 mb-6 shadow-inner')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className={cn('text-3xl font-bold text-gray-800 mb-3')}>Page Not Found</h1>
            <p className={cn('text-gray-600 mb-8 text-lg leading-relaxed')}>
              We couldn't find the page you're looking for. Please check the URL or try searching
              for a different city.
            </p>
            <div className={cn('flex flex-col sm:flex-row gap-4 w-full')}>
              <Button
                onClick={() => navigate(ROUTES.SEARCH)}
                className={cn(
                  'bg-blue-600 hover:bg-blue-700 text-white transition-colors',
                  'py-2 px-4 text-base font-medium rounded-md shadow-sm hover:shadow-md'
                )}
              >
                Search Again
              </Button>
              <Button
                onClick={() => navigate(ROUTES.HOME)}
                variant="outline"
                className={cn(
                  'border border-gray-300 hover:bg-gray-50 transition-colors',
                  'py-2 px-4 text-base font-medium rounded-md text-gray-700'
                )}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
        <div
          className={cn('bg-gray-50 p-4 flex justify-center space-x-4 border-t border-gray-100')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.758a.75.75 0 001.06-1.061l-1.59-1.591a.75.75 0 00-1.061 1.06l1.591 1.591z" />
          </svg>
          <span className="text-gray-500">Weather App</span>
        </div>
      </div>
    </div>
  );
}
