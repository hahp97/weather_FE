import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isSearch = location.pathname === "/search";

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Weather App
        </Link>

        <nav>
          <div className="flex items-center gap-4">
            {!isHome && (
              <Button asChild variant="ghost">
                <Link to="/">Home</Link>
              </Button>
            )}

            {!isSearch && (
              <Button asChild variant={isHome ? "outline" : "ghost"}>
                <Link to="/search">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
