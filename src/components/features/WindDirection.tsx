import { cn } from '@/utils/cn';

interface WindDirectionProps {
  degrees: number;
  speed: number;
  className?: string;
  compact?: boolean;
  showDegrees?: boolean;
}

const directionArrows = [
  { min: 337.5, max: 360, arrow: '→' },
  { min: 0, max: 22.5, arrow: '→' },
  { min: 22.5, max: 67.5, arrow: '↗' },
  { min: 67.5, max: 112.5, arrow: '↑' },
  { min: 112.5, max: 157.5, arrow: '↖' },
  { min: 157.5, max: 202.5, arrow: '←' },
  { min: 202.5, max: 247.5, arrow: '↙' },
  { min: 247.5, max: 292.5, arrow: '↓' },
  { min: 292.5, max: 337.5, arrow: '↘' },
];

export function WindDirection({
  degrees,
  speed,
  className,
  compact = false,
  showDegrees = true,
}: WindDirectionProps) {
  const getWindArrow = (degrees: number): string => {
    const direction = directionArrows.find(
      dir => (degrees >= dir.min && degrees < dir.max) || (dir.min === 337.5 && degrees >= dir.min)
    );

    return direction?.arrow || '→';
  };

  const arrow = getWindArrow(degrees);

  return (
    <div className={cn('flex items-center', compact ? 'flex-col' : 'gap-2', className)}>
      {compact ? (
        <div className={cn('flex items-center justify-center')}>
          <span className="text-base mr-1">{arrow}</span>
          <span className="text-base font-medium">{speed} m/s</span>
        </div>
      ) : (
        <>
          <div className="text-lg">{arrow}</div>
          <div className={cn('flex', 'items-center gap-1')}>
            <span className="text-base font-medium">{speed} m/s</span>
            {showDegrees && <span className="text-base text-gray-500">{degrees}°</span>}
          </div>
        </>
      )}
    </div>
  );
}
