import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bed } from '../../../mocks/mockdata';
import { FormField } from '../../shared/forms/FormField';
import { toast } from 'react-hot-toast';

interface BedFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBed: (name: string, size: string, notes: string) => void;
  bedToEdit?: Bed | null;
}

const BedFormModal: React.FC<BedFormModalProps> = ({
  isOpen,
  onClose,
  onSaveBed,
  bedToEdit,
}) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (bedToEdit) {
      setName(bedToEdit.name);
      setSize(bedToEdit.size);
      setNotes(bedToEdit.notes);
    } else {
      setName('');
      setSize('');
      setNotes('');
    }
  }, [bedToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a bed name.';
    }

    if (!size.trim()) {
      newErrors.size = 'Please enter a bed size.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveBed(name.trim(), size.trim(), notes.trim());
    toast.success(bedToEdit ? 'Bed updated successfully!' : 'New bed added!');

    setName('');
    setSize('');
    setNotes('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSize('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const modalText = {
    title: bedToEdit ? 'Edit Bed' : 'Add New Bed',
    button: bedToEdit ? 'Update Bed' : 'Add Bed',
    description: bedToEdit
      ? 'Update the details of this garden bed.'
      : 'Start planning a new garden bed for your space.',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={modalText.title}
      role='dialog'
      className='relative w-full max-w-md mx-auto mt-24 bg-white p-8 rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50'
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      aria={{
        modal: true,
        labelledby: 'modal-title',
        describedby: 'modal-description',
      }}
    >
      <button
        onClick={handleClose}
        aria-label='Close'
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a452c] focus-visible:rounded-md w-5 h-5'
      >
        <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
      </button>

      <h2
        id='modal-title'
        className='text-2xl font-bold text-center text-[#2a452c] mt-6 mb-2'
      >
        <FontAwesomeIcon
          icon={faSeedling}
          className='mr-1'
          aria-hidden='true'
        />
        {modalText.title}
      </h2>
      <p
        id='modal-description'
        className='text-sm text-center text-gray-600 mb-8'
      >
        {modalText.description}
      </p>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormField
          id='name'
          label='Name'
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
          maxLength={24}
        />
        <FormField
          id='bed-size'
          label='Size (e.g. 4x4)'
          value={size}
          onChange={(value) => {
            setSize(value);
            setErrors((prev) => ({ ...prev, size: '' }));
          }}
          error={errors.size}
          maxLength={24}
        />

        <FormField
          id='bed-notes'
          label='Notes (Optional)'
          value={notes}
          onChange={setNotes}
          type='textarea'
          maxLength={500}
        />
        <button
          type='submit'
          className='mt-2 w-full bg-[#e9541e] text-white font-semibold text-sm py-2 rounded hover:bg-[#d34712] transition flex items-center justify-center'
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' aria-hidden='true' />
          {modalText.button}
        </button>
      </form>
    </Modal>
  );
};

export default BedFormModal;
