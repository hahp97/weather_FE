import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { TrashIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  isMultiple?: boolean;
  useDirectRender?: boolean;
}

export function DeleteConfirmModal({
  isOpen = true,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  itemName,
  isMultiple = false,
  useDirectRender = false,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const content = (
    <>
      <div className="flex items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 mb-1">
          <TrashIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-0 ml-4 text-left">
          <p className="text-sm font-medium text-gray-800">
            {isMultiple
              ? 'Are you sure you want to delete all search history?'
              : itemName
              ? `Are you sure you want to delete "${itemName}" from search history?`
              : 'Are you sure you want to delete this item?'}
          </p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary" size="pill" onClick={onClose} className="font-medium">
          Cancel
        </Button>
        <Button variant="softRed" size="pill" onClick={handleConfirm} className="font-medium">
          Delete
        </Button>
      </div>
    </>
  );

  if (useDirectRender) {
    return (
      <div className="p-6">
        {title && (
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          </div>
        )}
        {content}
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      {content}
    </Modal>
  );
}
