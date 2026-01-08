import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faLocationDot,
  faNoteSticky,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { getAccentColor } from '../../../../utils/getAccentColor';
import { formatDate } from '../../../../utils/formatDate';
import { ViewKey } from '../../../../mocks/mockdata';
import { capitalize } from '../../../../utils/capitalize';
import { useBedContext } from '../../../../context/BedContext';
import ConfirmModal from '../../../shared/ConfirmModal';
import { useState } from 'react';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import toast from 'react-hot-toast';

export interface PlantingCardProps {
  id: string;
  cropId: string;
  cropName: string;
  bedName: string;
  datePlanted: string;
  notes?: string;
}

export const PlantingCard: React.FC<PlantingCardProps> = ({
  id,
  cropId,
  cropName,
  bedName,
  datePlanted,
  notes,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { beds } = useBedContext();
  const { deletePlanting } = usePlantingHistoryContext();
  const { textAccent, bgAccent } = getAccentColor(ViewKey.PlantLog);

  const isCropStillActive = beds.some((bed) =>
    bed.crops.some((crop) => crop.id === cropId)
  );

  const deletePlantingMessage = (
    <>
      Are you sure you want to delete the planting of{' '}
      <strong>{cropName}</strong>?
    </>
  );

  const handleDelete = () => {
    deletePlanting(id);
    toast.success(`${cropName} was deleted from history`);
    setIsConfirmOpen(false);
  };
  return (
    <div
      key={id}
      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition flex flex-col'
    >
      {/* Title with icon */}
      <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
        <h3 className='text-lg font-semibold text-gray-900'>
          {capitalize(cropName)}
        </h3>

        <div className='relative inline-block group'>
          <button
            type='button'
            onClick={() => setIsConfirmOpen(true)}
            disabled={isCropStillActive}
            className={isCropStillActive ? 'text-gray-400' : 'text-[#2a452c]'}
            aria-label={`Delete planting of ${cropName}`}
          >
            <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
          </button>

          {isCropStillActive && (
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap rounded ${bgAccent} px-2 py-1 text-xs text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-10`}
            >
              Cannot delete while crop is active in a bed
            </span>
          )}
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
          title='Delete Planting'
          message={deletePlantingMessage}
        />
      </div>

      <div className='text-sm text-gray-700 space-y-2'>
        <p className='flex items-center gap-2'>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={textAccent}
            aria-hidden='true'
          />
          <strong>Location:</strong> {bedName}
        </p>
        <p className='flex items-center gap-2 mb-2'>
          <FontAwesomeIcon
            icon={faCalendarDays}
            aria-hidden='true'
            className={textAccent}
          />
          <strong>Planted:</strong> {formatDate(datePlanted)}{' '}
        </p>

        <div className='min-h-[24px]'>
          {notes?.trim() ? (
            <p className='flex items-start gap-2'>
              <FontAwesomeIcon
                icon={faNoteSticky}
                aria-hidden='true'
                className={`mt-[2px] ${textAccent}`}
              />
              <span>
                <strong>Notes:</strong> {notes}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
