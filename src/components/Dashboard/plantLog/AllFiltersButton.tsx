import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AllFilterButtonProps {
  onClick: () => void;
}

export const AllFilterButton: React.FC<AllFilterButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='rounded-full px-4 py-2 text-sm border border-gray-300 bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition'
    >
      <FontAwesomeIcon icon={faSliders} aria-hidden='true' />
      All Filters
    </button>
  );
};
