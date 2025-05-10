import { SearchForm } from "@/components/features/SearchForm";
import { SearchHistory } from "@/components/features/SearchHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SearchPage() {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Search Location</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm />
          <SearchHistory />
        </CardContent>
      </Card>

      <div className="mt-6 text-sm text-center text-muted-foreground">
        <p>
          Enter a city or country name to get the current weather and forecast
          data.
        </p>
        <p className="mt-2">
          Your recent searches will appear here for quick access.
        </p>
      </div>
    </div>
  );
}
