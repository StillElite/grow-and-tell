import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRulerCombined,
  faSeedling,
  faNoteSticky,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import CropFormModal from './CropFormModal';
import { Bed, Crop, ViewKey } from '../../../../mocks/mockdata';
import { getAccentColor } from '../../../../utils/getAccentColor';
import { usePlantingHistoryContext } from '../../../../context/PlantingHistoryContext';
import { capitalize } from '../../../../utils/capitalize';
import ConfirmModal from '../../../shared/ConfirmModal';
import { getPillClass } from '../../../../utils/getPillClass';

interface BedCardProps {
  bed: Bed;
  onView: (bedId: string) => void;
  onAddCrop: (updatedBed: Bed) => void;
  onEditBed: (bed: Bed) => void;
  onDeleteBed: (bedId: string) => void;
}

export const BedCard: React.FC<BedCardProps> = ({
  bed,
  onView,
  onAddCrop,
  onEditBed,
  onDeleteBed,
}) => {
  const [isCropFormModalOpen, setIsCropFormModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { textAccent } = getAccentColor(ViewKey.Beds);
  const { addPlantingToHistory, deletePlantingsForBed, plantingRecords } =
    usePlantingHistoryContext();

  const hasPlantingHistory = plantingRecords.some(
    (record) => record.bedId === bed.id,
  );

  const hasCrops = bed.crops.length > 0;
  const buttonClasses = hasCrops
    ? 'bg-[#244225] text-white hover:bg-[#356a3c]'
    : 'bg-gray-400 text-gray-500';

  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{bed.name}</strong>?
    </>
  );

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

    addPlantingToHistory({
      id: crypto.randomUUID(), // Unique ID for the history entry
      cropId: newCrop.id, // Link to the crop itself
      cropName: newCrop.name,
      bedId: bed.id,
      bedName: bed.name,
      datePlanted: newCrop.datePlanted,
      notes: newCrop.notes,
    });

    onAddCrop(updatedBed);
  };

  const handleDeleteBedOnly = () => {
    onDeleteBed(bed.id);
    setIsConfirmOpen(false);
  };

  const handleDeleteBedAndHistory = () => {
    onDeleteBed(bed.id);
    deletePlantingsForBed(
      bed.id,
      bed.crops.map((c) => c.id),
    );
    setIsConfirmOpen(false);
  };

  return (
    <>
      <div
        key={bed.id}
        className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition flex flex-col '
      >
        {/* Top section */}
        <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
          <h3 className='text-lg font-semibold text-gray-900 truncate'>
            {capitalize(bed.name)}
          </h3>
          <div className='flex gap-3 text-sm'>
            <button
              type='button'
              className='text-[#244225]'
              onClick={() => {
                onEditBed(bed);
              }}
              aria-label={`Edit ${bed.name}`}
            >
              <FontAwesomeIcon aria-hidden='true' icon={faPen} />
            </button>
            <button
              type='button'
              onClick={() => setIsConfirmOpen(true)}
              className='text-red-700'
              aria-label={`Delete ${bed.name}`}
            >
              <FontAwesomeIcon aria-hidden='true' icon={faTrash} />
            </button>
          </div>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleDeleteBedOnly}
            confirmLabel='Remove bed'
            onSecondaryConfirm={handleDeleteBedAndHistory}
            secondaryConfirmLabel='Remove bed from history'
            secondaryConfirmDisabled={!hasPlantingHistory}
            title='Remove Bed'
            message={confirmMessage}
          />
        </div>

        {/* Details */}
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
                  <span key={crop.id} className={getPillClass()}>
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
                  aria-hidden='true'
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
            type='button'
            className={`text-white text-sm px-4 py-1 rounded transition ${buttonClasses}`}
            onClick={() => onView(bed.id)}
            aria-label={`View details for ${bed.name}`}
            disabled={!hasCrops}
          >
            View
          </button>
          <button
            type='button'
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
