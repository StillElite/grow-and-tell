import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRulerCombined,
  faSeedling,
  faNoteSticky,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { getAccentColor } from '../../../utils/getAccentColor';
import { Bed, Crop, ViewKey } from '../../../mocks/mockdata';
import { useState } from 'react';
import CropFormModal from './CropFormModal';
import ConfirmModal from '../../shared/ConfirmModal';
import { capitalize } from '../../../utils/capitalize';

interface BedCardProps {
  bed: Bed;
  onView: (bedId: string) => void;
  onAddCrop: (updatedBed: Bed) => void;
  onEditBed: (bed: Bed) => void;
  onDeleteBed: (bedId: string) => void;
}

export const BedCard = ({
  bed,
  onView,
  onAddCrop,
  onDeleteBed,
  onEditBed,
}: BedCardProps) => {
  const [isCropFormModalOpen, setIsCropFormModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { textAccent } = getAccentColor(ViewKey.Beds);
  const hasCrops = bed.crops.length > 0;

  const deleteBedMessage = (
    <>
      Are you sure you want to delete <strong>{bed.name}</strong>?
    </>
  );
  const pillClass =
    'inline-block bg-[#d9e9da] text-[#2a452c] text-xs font-medium px-2 py-0.5 rounded-full';

  const handleAddCrop = (newCropData: {
    name: string;
    datePlanted: string;
    notes: string;
  }) => {
    const newCrop: Crop = {
      id: crypto.randomUUID(),
      name: newCropData.name,
      datePlanted: newCropData.datePlanted,
      notes: newCropData.notes,
    };
    const updatedBed = {
      ...bed,
      crops: [...bed.crops, newCrop],
    };

    onAddCrop(updatedBed);
  };

  return (
    <>
      <div
        key={bed.id}
        className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition flex flex-col'
      >
        {/* Top section */}
        <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
          <h3 className='text-lg font-semibold text-gray-900 truncate'>
            {capitalize(bed.name)}
          </h3>
          <div className='flex gap-3 text-sm'>
            <button
              className='text-[#244225]'
              onClick={() => {
                onEditBed(bed);
              }}
              aria-label={`Edit ${bed.name}`}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className='text-red-700'
              aria-label={`Delete ${bed.name}`}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => onDeleteBed(bed.id)}
            title='Delete Bed'
            message={deleteBedMessage}
          />
        </div>
        <div className='flex-1'>
          <p className='flex items-center gap-2 mb-2 text-sm text-gray-700'>
            <FontAwesomeIcon
              icon={faRulerCombined}
              aria-hidden='true'
              className={textAccent}
            />
            <strong className='text-gray-800'>Size:</strong> {bed.size}
          </p>

          {hasCrops && (
            <div className='min-h-[24px]'>
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
                <FontAwesomeIcon
                  icon={faSeedling}
                  aria-hidden='true'
                  className={textAccent}
                />
                <strong className='text-gray-800'>Crops:</strong>
                {bed.crops.map((crop) => (
                  <span key={crop.id} className={pillClass}>
                    {capitalize(crop.name)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {bed.notes && (
            <div className='min-h-[24px] mt-2'>
              <p className='flex items-start gap-2 text-sm text-gray-700'>
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  className={`mt-[2px] ${textAccent}`}
                />
                <span>
                  <strong>Notes:</strong> {bed.notes}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Bottom buttons */}
        <div className='flex items-center justify-between mt-10'>
          <button
            className='bg-[#244225] text-white text-sm px-4 py-1 rounded hover:bg-[#356a3c] transition'
            onClick={() => onView(bed.id)}
            aria-label={`View details for ${bed.name}`}
          >
            View
          </button>
          <button
            onClick={() => setIsCropFormModalOpen(true)}
            className='text-sm text-orange-700 hover:underline'
          >
            {hasCrops ? '+ Add Crops' : '+ Start Planting'}
          </button>
        </div>
      </div>
      <CropFormModal
        isOpen={isCropFormModalOpen}
        onClose={() => setIsCropFormModalOpen(false)}
        onSaveCrop={handleAddCrop}
      />
    </>
  );
};
