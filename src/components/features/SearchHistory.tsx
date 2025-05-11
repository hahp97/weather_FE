import { DeleteConfirmModal } from '@/components/modals/deleteConfirmModal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modalContext';
import { usePrefetchWeather } from '@/hooks/api/usePrefetchWeather';
import { useSearchHistoryStore } from '@/store/searchStore';
import { MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

export function SearchHistory() {
  const navigate = useNavigate();
  const { history, removeFromHistory, clearHistory } = useSearchHistoryStore();
  const { prefetchWeather } = usePrefetchWeather();
  const { showModal, hideModal } = useModal();

  if (_.isEmpty(history)) {
    return (
      <div className="py-6">
        <p className="text-center text-gray-500 py-2 text-base">
          No search history available. Start by searching for a location!
        </p>
      </div>
    );
  }

  const handleSearch = (location: string) => {
    navigate(`/?search=${encodeURIComponent(location)}`);
  };

  const handleMouseEnter = (location: string) => {
    prefetchWeather(location);
  };

  const openDeleteModal = (item?: string) => {
    const isMultiple = !item;
    showModal(
      <DeleteConfirmModal
        useDirectRender={true}
        onClose={hideModal}
        onConfirm={() => {
          if (isMultiple) {
            clearHistory();
          } else if (item) {
            removeFromHistory(item);
          }
          hideModal();
        }}
        title="Confirm Delete"
        isMultiple={isMultiple}
        itemName={item}
      />
    );
  };

  const openDeleteItemModal = (item: string) => openDeleteModal(item);
  const openDeleteAllModal = () => openDeleteModal();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-base text-gray-500">{history.length} locations searched</span>
        <Button
          onClick={openDeleteAllModal}
          className="text-base text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 py-1 px-2"
          size="sm"
          variant="secondary"
        >
          <TrashIcon className="h-3 w-3" />
          <span>Clear all</span>
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden">
        {history.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center justify-between py-3 px-2 border-b border-gray-50 last:border-b-0 hover:bg-cyan-100 transition-colors rounded-md"
            onMouseEnter={() => handleMouseEnter(item)}
          >
            <span className="text-base text-gray-700">{item}</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleSearch(item)}
                className="px-2 rounded-full hover:bg-gray-200 transition-colors"
                variant="ghost"
                size="sm"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" />
              </Button>
              <Button
                onClick={() => openDeleteItemModal(item)}
                className="px-2 rounded-full hover:bg-red-400 transition-colors"
                variant="ghost"
                size="sm"
                aria-label="Remove from history"
              >
                <TrashIcon className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
