import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRecycle,
  faNoteSticky,
  faTrash,
  faPen,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { getAccentColor } from '../../../../utils/getAccentColor';
import { CompostBin, ViewKey } from '../../../../mocks/mockdata';
import { useState } from 'react';
import ConfirmModal from '../../../shared/ConfirmModal';
import { capitalize } from '../../../../utils/capitalize';

interface CompostBinCardProps {
  compostBin: CompostBin;
  onDeleteBin: (compostBinId: string) => void;
  onEditCompostBin?: (compostBin: CompostBin) => void;
}

export const CompostBinCard: React.FC<CompostBinCardProps> = ({
  compostBin,
  onDeleteBin,
  onEditCompostBin,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { textAccent } = getAccentColor(ViewKey.Compost);

  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{compostBin.name}</strong>?
    </>
  );

  const pillClass =
    'inline-block bg-[#d9e9da] text-[#2a452c] text-xs font-medium px-2 py-0.5 rounded-full';

  const handleDeleteCompostBin = () => {
    onDeleteBin(compostBin.id);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <div
        key={compostBin.id}
        className='rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition flex flex-col '
      >
        {/* Top section */}
        <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
          <h3 className='text-lg font-semibold text-gray-900 truncate'>
            {capitalize(compostBin.name)}
          </h3>
          <div className='flex gap-3 text-sm'>
            <button
              type='button'
              className='text-[#244225]'
              onClick={() => {
                onEditCompostBin(compostBin);
              }}
              aria-label={`Edit ${compostBin.name}`}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              type='button'
              onClick={() => setIsConfirmOpen(true)}
              className='text-red-700'
              aria-label={`Delete ${compostBin.name}`}
            >
              <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
            </button>
          </div>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleDeleteCompostBin}
            confirmLabel='Remove bin'
            title='Remove Bin'
            message={confirmMessage}
          />
        </div>
        <div className='flex-1'>
          <p className='flex items-center gap-2 mb-2 text-sm text-gray-700'>
            <FontAwesomeIcon
              icon={faRecycle}
              aria-hidden='true'
              className={textAccent}
            />
            <strong className='text-gray-800'>Type:</strong> {compostBin.type}
          </p>

          <p className='flex items-center gap-2 mb-2 text-sm text-gray-700'>
            <FontAwesomeIcon
              icon={faCircleCheck}
              aria-hidden='true'
              className={`mr-[0px] ${textAccent}`}
            />
            <strong className='text-gray-800'>Status:</strong>{' '}
            <span className={pillClass}>{compostBin.status}</span>
          </p>

          {compostBin.notes && (
            <div className='min-h-[24px] mt-2'>
              <p className='flex items-start gap-2 text-sm text-gray-700'>
                <FontAwesomeIcon
                  icon={faNoteSticky}
                  aria-hidden='true'
                  className={`mt-[2px] ${textAccent}`}
                />
                <span>
                  <strong>Notes:</strong> {compostBin.notes}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
