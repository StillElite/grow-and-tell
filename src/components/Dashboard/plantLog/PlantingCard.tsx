import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faLocationDot,
  faNoteSticky,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { getAccentColor } from '../../../utils/getAccentColor';
import { formatDate } from '../../../utils/formatDate';
import { ViewKey } from '../../../mocks/mockdata';

export interface PlantingCardProps {
  id: string;
  name: string;
  bedName: string;
  datePlanted: string;
  notes?: string;
}

export const PlantingCard: React.FC<PlantingCardProps> = ({
  id,
  name,
  bedName,
  datePlanted,
  notes,
}) => {
  const { textAccent } = getAccentColor(ViewKey.PlantLog);

  return (
    <div
      key={id}
      className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition flex flex-col'
    >
      {/* Title with icons */}
      <div className='mb-4 flex items-start justify-between border-b border-gray-300'>
        <h3 className='text-lg font-semibold text-gray-900'>{name}</h3>
        <div className='flex gap-3 text-sm'>
          <button
            // onClick={() => onEditCrop(crop)}
            aria-label={`Edit ${name}`}
            className='text-[#244225]'
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            // onClick={() => setIsConfirmOpen(true)}
            aria-label={`Delete ${name}`}
            // className='text-red-700'
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
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
