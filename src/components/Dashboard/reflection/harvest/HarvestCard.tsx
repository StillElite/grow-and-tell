import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faPen,
  faTrash,
  faShoppingBasket,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { Harvest } from '../../../../mocks/mockdata';
import { capitalize } from '../../../../utils/capitalize';
import { formatDate } from '../../../../utils/formatDate';
import { useState } from 'react';
import ConfirmModal from '../../../shared/ConfirmModal';
import { formatHarvestUnit } from '../../../../utils/formatHarvestUnit';

export interface HarvestCardProps {
  harvest: Harvest;
  onEditHarvest?: (harvest: Harvest) => void;
  onDeleteHarvest: (harvestId) => void;
}

export const HarvestCard: React.FC<HarvestCardProps> = ({
  harvest,
  onEditHarvest,
  onDeleteHarvest,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{harvest.name}</strong>?
    </>
  );

  const handleDeleteHarvest = () => {
    onDeleteHarvest(harvest.id);
    setIsConfirmOpen(false);
  };

  return (
    <div
      role='group'
      aria-label='Harvest entry card'
      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition flex flex-col'
    >
      {/* Title + actions */}
      <div className='mb-4 flex items-start justify-between border-b border-gray-300 pb-2'>
        <h3 className='text-lg font-semibold text-gray-900 truncate'>
          {capitalize(harvest.name)}
        </h3>

        <div className='flex gap-3 text-sm'>
          <button
            type='button'
            onClick={() => onEditHarvest(harvest)}
            aria-label='Edit harvest entry'
            className='text-[#244225]'
          >
            <FontAwesomeIcon icon={faPen} aria-hidden='true' />
          </button>

          <button
            type='button'
            onClick={() => setIsConfirmOpen(true)}
            aria-label={`Delete ${harvest.name} harvest`}
            className='text-red-700'
          >
            <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
          </button>
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteHarvest}
          confirmLabel='Delete Harvest'
          title={`Delete ${harvest.name} harvest`}
          message={confirmMessage}
        />
      </div>

      {/* Details */}
      <div className='text-sm text-gray-700 space-y-3'>
        <p className='flex items-center gap-2'>
          <FontAwesomeIcon
            icon={faShoppingBasket}
            aria-hidden='true'
            className='text-[#244225] pb-1'
          />
          <strong className='text-gray-800'>Amount:</strong>
          {harvest.quantity} {formatHarvestUnit(harvest.quantity, harvest.unit)}
        </p>

        <p className='flex items-start gap-2'>
          <FontAwesomeIcon
            icon={faCalendarDays}
            aria-hidden='true'
            className='text-[#244225] pt-[2px]'
          />
          <strong className='text-gray-800'>Harvested: </strong>{' '}
          {formatDate(harvest.dateHarvested)}
        </p>

        <div className='min-h-[24px] mt-2'>
          <p className='flex items-start gap-2 text-sm '>
            <FontAwesomeIcon
              icon={faTags}
              aria-hidden='true'
              className='text-[#244225] pt-[2px]'
            />
            <strong className='text-gray-800'>Category: </strong>{' '}
            {harvest.category}
          </p>
        </div>
      </div>
    </div>
  );
};
