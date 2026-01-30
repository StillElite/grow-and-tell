import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faPen,
  faTrash,
  faLeaf,
  faFlask,
} from '@fortawesome/free-solid-svg-icons';
import {
  SoilAmendmentType,
  SoilRecord,
  ViewKey,
} from '../../../../mocks/mockdata';
import { capitalize } from '../../../../utils/capitalize';
import { useState } from 'react';
import ConfirmModal from '../../../shared/ConfirmModal';
import toast from 'react-hot-toast';
import { getPillClass } from '../../../../utils/getPillClass';
import { SoilAmendmentDropdown } from './SoilAmendmentDropdown';
import { getAccentColor } from '../../../../utils/getAccentColor';

export interface SoilCardProps {
  soilRecord: SoilRecord;
  onEditSoilRecord?: (soilRecord: SoilRecord) => void;
  onDeleteSoilRecord: (soilRecordId: string) => void;
}

export const SOIL_AMENDMENT_OPTIONS: SoilAmendmentType[] = [
  'Compost',
  'Manure',
  'Worm Tea',
  'Mulch',
  'Cover Crop',
  'Leaf mold',
];

export const SoilCard: React.FC<SoilCardProps> = ({
  soilRecord,
  onEditSoilRecord,
  onDeleteSoilRecord,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { textAccent } = getAccentColor(ViewKey.SoilRecord);
  const [amendments, setAmendments] = useState<SoilAmendmentType[]>(
    soilRecord.amendments,
  );
  const [isAmendmentMenuOpen, setIsAmendmentMenuOpen] = useState(false);

  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{soilRecord.name}</strong>?
    </>
  );

  const handleDeleteSoilRecord = () => {
    onDeleteSoilRecord(soilRecord.id);
    setIsConfirmOpen(false);
    toast.success('Soil record deleted successfully');
  };

  return (
    <div
      key={soilRecord.id}
      role='group'
      aria-label='Soil Record entry card'
      className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition flex flex-col'
    >
      {/* Top section */}
      <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
        <h3 className='text-lg font-semibold text-gray-900 truncate'>
          {capitalize(soilRecord.name)}
        </h3>

        <div className='flex gap-3 text-sm'>
          <button
            type='button'
            onClick={() => onEditSoilRecord(soilRecord)}
            aria-label={`Edit ${soilRecord.name} entry`}
            className='text-[#244225] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#244225] rounded'
          >
            <FontAwesomeIcon icon={faPen} aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={() => setIsConfirmOpen(true)}
            aria-label={`Delete ${soilRecord.name} soil record`}
            className='text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#244225]  rounded'
          >
            <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
          </button>
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteSoilRecord}
          confirmLabel='Delete Soil Record'
          title={`Delete ${soilRecord.name} soil record`}
          message={confirmMessage}
        />
      </div>

      {/* Details */}
      <div className='text-sm text-gray-700 space-y-2'>
        <p className='flex items-center gap-2'>
          <FontAwesomeIcon
            icon={faCalendarDays}
            aria-hidden='true'
            className={`${textAccent} pb-1`}
          />
          <strong className='text-gray-800'>Season:</strong>
          {soilRecord.season}
        </p>

        <div className='min-h-[24px]'>
          {/* Amendments header row */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-sm'>
              <FontAwesomeIcon
                icon={faLeaf}
                aria-hidden='true'
                className={`${textAccent} pb-1`}
              />
              <strong className='text-gray-800'>Amendments:</strong>
              <SoilAmendmentDropdown
                options={SOIL_AMENDMENT_OPTIONS}
                selectedAmendments={amendments}
                onChange={(next) => setAmendments(Array.from(new Set(next)))}
                open={isAmendmentMenuOpen}
                onToggle={() => setIsAmendmentMenuOpen((prev) => !prev)}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-wrap gap-2'>
            {amendments.length === 0 ? (
              <span className='text-xs text-gray-500 py-0.5'>None logged</span>
            ) : (
              amendments.map((amendment) => (
                <span key={amendment} className={getPillClass()}>
                  {capitalize(amendment)}
                </span>
              ))
            )}
          </div>
        </div>

        <div className='min-h-[24px] mt-2'>
          <div className='flex items-start gap-2 text-sm'>
            <FontAwesomeIcon
              icon={faFlask}
              aria-hidden='true'
              className={`${textAccent} mt-0.5`}
            />

            <div className='flex flex-col'>
              {/* Line 1: label + date */}
              <div className='flex items-center gap-2'>
                <strong className='text-gray-800'>Last test:</strong>
                <span className='text-gray-700'>Oct 12</span>
              </div>

              {/* Line 2: values */}
              <div className='mt-1 grid grid-cols-4 gap-x-3 gap-y-1 text-xs text-gray-700'>
                <div className='text-center'>
                  <div className='text-gray-500'>pH</div>
                  <div className='font-medium'>6.4</div>
                </div>

                <div className='text-center'>
                  <div className='text-gray-500'>N</div>
                  <div className='font-medium'>2</div>
                </div>

                <div className='text-center'>
                  <div className='text-gray-500'>P</div>
                  <div className='font-medium'>1</div>
                </div>

                <div className='text-center'>
                  <div className='text-gray-500'>K</div>
                  <div className='font-medium'>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className='flex items-center justify-between mt-10'>
        <button
          type='button'
          className='bg-[#244225] text-white text-sm px-4 py-1 rounded hover:bg-[#356a3c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244225]'
          aria-label={`View details for ${soilRecord.name}`}
        >
          View
        </button>
        <button
          type='button'
          className={`text-sm ${textAccent} hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#244225] rounded px-1`}
          aria-label={`Add soil test for ${soilRecord.name}`}
        >
          + Add test
        </button>
      </div>
    </div>
  );
};
