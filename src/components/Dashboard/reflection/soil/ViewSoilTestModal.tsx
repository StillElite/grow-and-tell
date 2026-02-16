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
  const sortedTests = [...soilTests].sort(
    (a, b) =>
      new Date(b.dateTested).getTime() - new Date(a.dateTested).getTime(),
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      contentLabel='Soil Tests'
      aria={{
        labelledby: 'manage-defaults-title',
        describedby: 'manage-defaults-desc',
      }}
      className='relative w-full max-w-md mx-auto mt-24 bg-white dark:bg-dark-bg p-6 rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black/40 z-50 flex items-start justify-center'
    >
      {/* Close */}
      <button
        type='button'
        onClick={onClose}
        aria-label='Close Manage Default Tasks'
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c] rounded-md w-5 h-5'
      >
        <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
      </button>

      {/* Header Section */}
      <h2
        id='manage-defaults-title'
        className='text-xl font-bold text-[#1E6635] mb-1'
      >
        Soil Test History
      </h2>
      <p id='manage-defaults-desc' className='text-sm text-gray-600 mb-6'>
        Review past soil test results for this bed and see how your soil has
        evolved over time.
      </p>

      <div className='max-h-[400px] overflow-y-auto rounded-xl border border-gray-200 shadow-sm relative'>
        <table className='w-full text-sm border-collapse'>
          <thead className='sticky top-0 z-20 bg-[#F4F7F2]'>
            <tr className='text-[#1E6635]'>
              <th className='px-6 py-4 text-left text-xs font-bold uppercase tracking-widest border-b border-gray-200'>
                Date
              </th>
              <th className='px-4 py-4 text-center text-xs font-bold uppercase tracking-widest border-b border-gray-200'>
                pH
              </th>
              <th className='px-4 py-4 text-right text-xs font-bold uppercase tracking-widest border-b border-gray-200'>
                N
              </th>
              <th className='px-4 py-4 text-right text-xs font-bold uppercase tracking-widest border-b border-gray-200'>
                P
              </th>
              <th className='px-4 py-4 text-right text-xs font-bold uppercase tracking-widest border-b border-gray-200'>
                K
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100 bg-white'>
            {sortedTests.map((test) => (
              <tr
                key={test.id}
                className='hover:bg-[#79B040]/5 transition-colors group'
              >
                <td className='px-6 py-4 whitespace-nowrap font-semibold '>
                  {formatDate(test.dateTested)}
                </td>

                <td className='px-4 py-4 text-center'>
                  <span className='inline-flex items-center px-3 py-1 rounded-md bg-[#79B040]/10 text-[#5C8233] font-mono text-xs font-bold border border-[#79B040]/20'>
                    {test.pH.toFixed(1)}
                  </span>
                </td>

                <td className='px-4 py-4 text-right font-mono text-gray-600 group-hover:text-gray-900'>
                  {test.nitrogen}
                </td>
                <td className='px-4 py-4 text-right font-mono text-gray-600 group-hover:text-gray-900'>
                  {test.phosphorus}
                </td>
                <td className='px-4 py-4 text-right font-mono text-gray-600 group-hover:text-gray-900'>
                  {test.potassium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
