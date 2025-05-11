import { cn } from '@/utils/cn';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps = {}) {
  return (
    <footer
      className={cn(
        'py-3 md:py-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-inner',
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-base text-gray-500">
        <p>Weather data provided by OpenWeather API</p>
        <p className="text-base mt-1 text-gray-400">© 2025 Weather App</p>
      </div>
    </footer>
  );
}
