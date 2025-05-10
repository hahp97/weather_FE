import { cn } from "@/lib/utils";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
}

export function WeatherIcon({
  iconCode,
  className,
  size = "md",
  alt = "Weather icon",
}: WeatherIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt={alt}
      className={cn(sizeClasses[size], className)}
    />
  );
}
