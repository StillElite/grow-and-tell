import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onSecondaryConfirm?: () => void;
  secondaryConfirmLabel?: string;
  secondaryConfirmDisabled?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = "This action can't be undone. Please confirm if you want to proceed.",
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onSecondaryConfirm,
  secondaryConfirmLabel,
  secondaryConfirmDisabled = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Confirmation'
      className='relative w-full max-w-lg mx-auto mt-24 bg-white p-6 rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50'
      shouldCloseOnOverlayClick={false}
    >
      <button
        onClick={onClose}
        aria-label='Close'
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none'
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className='flex flex-col items-center text-center mt-4'>
        <div className='bg-[#fef3c7] text-[#92400e] p-3 rounded-full mb-4'>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            size='lg'
            aria-hidden='true'
          />
        </div>

        <h2 className='text-lg font-semibold text-gray-800 mb-2'>{title}</h2>
        <p className='text-sm text-gray-600 mb-6'>{message}</p>

        <div className='flex gap-4'>
          <button
            onClick={onClose}
            className='px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-100'
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-1.5 text-sm bg-[#e9541e] text-white rounded hover:bg-[#d34712]'
          >
            {confirmLabel}
          </button>
          {onSecondaryConfirm && (
            <button
              onClick={onSecondaryConfirm}
              disabled={secondaryConfirmDisabled}
              className={`px-4 py-2 rounded ${
                secondaryConfirmDisabled
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
              }`}
            >
              {secondaryConfirmLabel}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
