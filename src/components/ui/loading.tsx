import { cn } from '@/utils/cn';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'spinner' | 'pulse';
  className?: string;
  text?: string;
  fullScreen?: boolean;
  color?: 'blue' | 'gray' | 'white';
}

export function Loading({
  size = 'md',
  variant = 'default',
  className,
  text,
  fullScreen = false,
  color = 'blue',
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const colorClasses = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };

  const pulseColorClasses = {
    blue: 'bg-blue-100',
    gray: 'bg-gray-200',
    white: 'bg-white/60',
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={cn(
              'animate-spin rounded-full border-4 border-gray-200',
              colorClasses[color].replace('text-', 'border-t-'),
              sizeClasses[size],
              className
            )}
          />
        );
      case 'pulse':
        return (
          <div className="animate-pulse flex flex-col items-center">
            <div
              className={cn('rounded-full mb-4', pulseColorClasses[color], sizeClasses[size])}
            ></div>
            {text ? (
              <div className={cn('h-6 rounded w-40 mb-3', pulseColorClasses[color])}></div>
            ) : (
              <div className={cn('h-4 rounded w-32', `${pulseColorClasses[color]}/70`)}></div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center">
            <svg
              className={cn('animate-spin', colorClasses[color], sizeClasses[size])}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        );
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        {renderLoader()}
        {text && (
          <p className={cn('mt-4 text-gray-600 font-medium', textSizeClasses[size])}>{text}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8',
        fullScreen ? 'h-screen w-screen' : '',
        className
      )}
    >
      {renderLoader()}
      {text && (
        <p className={cn('mt-4 text-gray-600 font-medium', textSizeClasses[size])}>{text}</p>
      )}
    </div>
  );
}
