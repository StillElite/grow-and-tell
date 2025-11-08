import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Crop } from '../../../../mocks/mockdata';
import { FormField } from '../../../shared/forms/FormField';
import { toast } from 'react-hot-toast';

interface CropFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCrop: (crop: {
    name: string;
    datePlanted: string;
    notes: string;
    id?: string;
  }) => void;
  cropToEdit?: Crop;
}

const CropFormModal: React.FC<CropFormModalProps> = ({
  isOpen,
  onClose,
  onSaveCrop,
  cropToEdit,
}) => {
  const [name, setName] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [notes, setNotes] = useState('');
  const [id, setId] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (cropToEdit && isOpen) {
      setName(cropToEdit.name);
      setDatePlanted(cropToEdit.datePlanted);
      setNotes(cropToEdit.notes);
      setId(cropToEdit.id);
    }
  }, [cropToEdit, isOpen]);

  const resetForm = () => {
    setName('');
    setDatePlanted('');
    setNotes('');
    setId('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a crop name.';
    }

    if (!datePlanted.trim()) {
      newErrors.datePlanted = 'Please enter a planted date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveCrop({
      name: name.trim(),
      datePlanted: datePlanted.trim(),
      notes: notes.trim(),
      id: cropToEdit?.id,
    });
    toast.success(
      cropToEdit ? 'Crop updated successfully!' : 'New crop added!'
    );

    resetForm();
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDatePlanted;
    setNotes('');
    setErrors({});
    onClose();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const modalText = {
    title: cropToEdit ? 'Edit Crop' : 'Add New Crop',
    button: cropToEdit ? 'Update Crop' : 'Add Crop',
    description: cropToEdit
      ? 'Update the details of this crop.'
      : 'Start planning a new crop for your garden bed.',
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      role='dialog'
      contentLabel={modalText.title}
      className='relative w-full max-w-md mx-auto mt-24 bg-white p-8 rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50'
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
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
          id='crop-name'
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
          id='crop-datePlanted'
          label='Date Planted'
          value={datePlanted}
          onChange={(value) => {
            setDatePlanted(value);
            setErrors((prev) => ({ ...prev, datePlanted: '' }));
          }}
          type='date'
          error={errors.datePlanted}
        />
        <FormField
          id='crop-notes'
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

export default CropFormModal;
