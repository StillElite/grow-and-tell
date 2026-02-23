import { useId } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SoilTest } from '../../../../types/types';
import { formatDate } from '../../../../utils/formatDate';

export interface VieWSoilTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  soilTests: SoilTest[];
}

export const VieWSoilTestModal: React.FC<VieWSoilTestModalProps> = ({
  isOpen,
  onClose,
  soilTests,
}) => {
  const titleId = useId();
  const descId = useId();

  const sortedTests = [...soilTests].sort(
    (a, b) =>
      new Date(b.dateTested).getTime() - new Date(a.dateTested).getTime(),
  );

  const handleScrollKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const scrollAmount = 50;
    const { key, currentTarget } = e;

    if (key === 'ArrowDown') {
      e.preventDefault();
      currentTarget.scrollTop += scrollAmount;
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      currentTarget.scrollTop -= scrollAmount;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      contentLabel='Soil Test History'
      aria={{
        labelledby: titleId,
        describedby: descId,
      }}
      className='relative w-full max-w-md mx-auto bg-white p-8 xs:rounded-lg shadow-xl border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
    >
      {/* Header */}
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h2 id={titleId} className='text-xl font-bold text-[#1E6635]'>
            Soil Test History
          </h2>
          <p id={descId} className='text-sm text-gray-500 mt-1 leading-snug'>
            Review past soil test results for this bed and see how your soil has
            evolved over time.
          </p>
        </div>
        <button
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-[#1E6635] rounded-md outline-none transition-colors'
        >
          <FontAwesomeIcon icon={faTimes} className='w-5 h-5' />
        </button>
      </div>

      <div
        tabIndex={0}
        role='region'
        aria-label='Soil test list'
        onKeyDown={handleScrollKeyDown}
        className='max-h-[450px] overflow-y-auto pr-1 space-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244225] focus-visible:ring-offset-4 rounded-lg'
      >
        {sortedTests.map((test) => (
          <div
            key={test.id}
            className='p-3 rounded-lg border border-gray-100 bg-white shadow-sm flex items-center hover:border-gray-200 transition-all'
          >
            {/* Date Section */}
            <div className='w-24 shrink-0'>
              <span className='text-sm font-bold text-gray-800'>
                {formatDate(test.dateTested)}
              </span>
            </div>

            {/* Metrics Section */}
            <div className='flex flex-1 items-center justify-around border-l border-gray-100 ml-3 pl-3'>
              <div className='text-center'>
                <span className='block text-[10px] font-bold text-[#557C2D]'>
                  pH
                </span>
                <span className='font-mono '>{test.pH.toFixed(1)}</span>
              </div>
              <div className='text-center'>
                <span className='block text-[10px] text-[#557C2D] '>N</span>
                <span className='font-mono '>{test.nitrogen}</span>
              </div>
              <div className='text-center'>
                <span className='block text-[10px] text-[#557C2D] '>P</span>
                <span className='font-mono '>{test.phosphorus}</span>
              </div>
              <div className='text-center'>
                <span className='block text-[10px] text-[#557C2D] '>K</span>
                <span className='font-mono '>{test.potassium}</span>
              </div>
            </div>
          </div>
        ))}

        {sortedTests.length === 0 && (
          <p className='text-center py-8 text-gray-400 text-sm'>
            No records found.
          </p>
        )}
      </div>
    </Modal>
  );
};
