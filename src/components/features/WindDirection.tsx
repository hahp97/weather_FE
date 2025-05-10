import { cn } from "@/lib/utils";

interface WindDirectionProps {
  degrees: number;
  speed: number;
  className?: string;
}

export function WindDirection({
  degrees,
  speed,
  className,
}: WindDirectionProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div
        className="flex items-center justify-center rounded-full border border-border bg-muted h-6 w-6"
        title={`Wind direction: ${degrees}°`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: `rotate(${degrees}deg)` }}
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </div>
      <span className="text-sm font-medium">{speed} m/s</span>
    </div>
  );
}
