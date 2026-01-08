import {
  faPen,
  faTrash,
  faCalendarDays,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Crop, ViewKey } from '../../../../mocks/mockdata';
import { getAccentColor } from '../../../../utils/getAccentColor';
import { useState } from 'react';
import ConfirmModal from '../../../shared/ConfirmModal';
import { formatDate } from '../../../../utils/formatDate';
import { capitalize } from '../../../../utils/capitalize';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';

interface CropCardProps {
  crop: Crop;
  onDelete?: () => void;
  onEditCrop?: (crop: Crop) => void;
}

export const CropCard: React.FC<CropCardProps> = ({
  crop,
  onDelete,
  onEditCrop,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { textAccent } = getAccentColor(ViewKey.Beds);
  const { plantingRecords, deletePlantingsByCropId } =
    usePlantingHistoryContext();

  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{crop.name}</strong>?
    </>
  );

  const hasPlantingHistory = plantingRecords.some(
    (record) => record.cropId === crop.id
  );

  const handleDeleteCropOnly = () => {
    onDelete?.();
    setIsConfirmOpen(false);
  };

  const handleDeleteCropAndHistory = () => {
    onDelete?.();
    deletePlantingsByCropId(crop.id);
    setIsConfirmOpen(false);
  };

  return (
    <div
      key={crop.id}
      role='group'
      aria-label={`Crop card for ${crop.name}`}
      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition flex flex-col'
    >
      {/* Title with icons */}
      <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
        <h3 className='text-lg font-semibold text-gray-900 truncate'>
          {capitalize(crop.name)}
        </h3>
        <div className='flex gap-3 text-sm'>
          <button
            type='button'
            onClick={() => onEditCrop(crop)}
            aria-label={`Edit ${crop.name}`}
            className='text-[#244225]'
          >
            <FontAwesomeIcon icon={faPen} aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={() => setIsConfirmOpen(true)}
            aria-label={`Delete ${crop.name}`}
            className='text-red-700'
          >
            <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
          </button>
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteCropOnly}
          confirmLabel='Remove bed'
          onSecondaryConfirm={handleDeleteCropAndHistory}
          secondaryConfirmLabel='Remove bed from history'
          secondaryConfirmDisabled={!hasPlantingHistory}
          title='Remove Bed'
          message={confirmMessage}
        />
      </div>

      {/* Details */}
      <div className='text-sm text-gray-700 space-y-2'>
        <p className='flex items-center gap-2 mb-2'>
          <FontAwesomeIcon
            icon={faCalendarDays}
            aria-hidden='true'
            className={textAccent}
          />
          <strong className='text-gray-800'>Planted:</strong>{' '}
          {formatDate(crop.datePlanted)}
        </p>

        <div className='min-h-[24px]'>
          {crop.notes?.trim() ? (
            <p className='flex items-start gap-2'>
              <FontAwesomeIcon
                icon={faNoteSticky}
                aria-hidden='true'
                className={`mt-[2px] ${textAccent}`}
              />
              <span>
                <strong className='text-gray-800'>Notes:</strong> {crop.notes}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
