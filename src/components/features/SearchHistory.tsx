import { Button } from '@/components/ui/button';
import { useSearchHistoryStore } from '@/store/search-store';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export function SearchHistory() {
  const navigate = useNavigate();
  const { history, removeFromHistory, clearHistory } = useSearchHistoryStore();

  if (_.isEmpty(history)) {
    return <p className="text-center text-muted-foreground py-4">No search history yet</p>;
  }

  const handleSearch = (location: string) => {
    navigate(`/?q=${encodeURIComponent(location)}`);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Search History</h2>
        {!_.isEmpty(history) && (
          <Button variant="ghost" size="sm" onClick={() => clearHistory()}>
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        {_.map(history, (item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center justify-between p-2 bg-background border rounded-md"
          >
            <span className="overflow-hidden text-ellipsis flex-1">{item}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleSearch(item)}
                title="Search again"
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => _.flow([() => removeFromHistory(item)])()}
                title="Remove from history"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
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

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
