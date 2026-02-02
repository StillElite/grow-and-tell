import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';
import { FormField } from '../../../shared/forms/FormField';
import { SelectFormField } from '../../../shared/forms/SelectFormField';
import {
  CompostBin,
  CompostStatus,
  compostStatusOptions,
  CompostType,
} from '../../../../mocks/mockdata';
import { RadioGroup } from '../../../shared/forms/RadioGroup';

export interface CompostBinFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCompostBin: (
    name: string,
    type: CompostType,
    status: CompostStatus,
    notes: string,
  ) => void;
  compostBinToEdit?: CompostBin | null;
}

export const COMPOST_TYPE_OPTIONS: { value: CompostType; label: string }[] = [
  { value: 'Worm', label: 'Worm' },
  { value: 'Leaf', label: 'Leaf' },
  { value: 'Hot', label: 'Hot' },
  { value: 'Cold', label: 'Cold' },
];

export const CompostBinFormModal: React.FC<CompostBinFormModalProps> = ({
  isOpen,
  onClose,
  onSaveCompostBin,
  compostBinToEdit,
}) => {
  const [name, setName] = useState(compostBinToEdit?.name ?? '');
  const [type, setType] = useState<CompostType | ''>(
    compostBinToEdit?.type ?? '',
  );
  const [status, setStatus] = useState<CompostStatus>(compostBinToEdit?.status);
  const [notes, setNotes] = useState(compostBinToEdit?.notes ?? '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (compostBinToEdit) {
      setName(compostBinToEdit.name);
      setType(compostBinToEdit.type);
      setStatus(compostBinToEdit.status);
      setNotes(compostBinToEdit.notes);
    } else {
      setName('');
      setType('');
      setStatus('');
      setNotes('');
    }
    setErrors({});
  }, [compostBinToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a bin name.';
    }

    if (!type) {
      newErrors.type = 'Please enter a bin type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSaveCompostBin(
      name.trim(),
      type as CompostType,
      (status || 'Active') as CompostStatus,
      notes.trim(),
    );
    toast.success(
      compostBinToEdit ? 'Bin updated successfully!' : 'New bin added!',
    );

    setName('');
    setType('');
    setStatus('');
    setNotes('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setType('');
    setNotes('');
    setStatus('');
    setErrors({});
    onClose();
  };

  const modalText = {
    title: compostBinToEdit ? 'Edit Bin' : 'Add New Bin',
    button: compostBinToEdit ? 'Update Bin' : 'Add Bin',
    description: compostBinToEdit
      ? 'Update the details of this compost bin.'
      : 'Start planning a new compost bin for your space.',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={modalText.title}
      role='dialog'
      className='relative w-full max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow border border-gray-200 focus:outline-none'
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
        type='button'
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
        <FontAwesomeIcon icon={faRecycle} className='mr-1' aria-hidden='true' />
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

        <SelectFormField
          id='compost-type'
          label='Select type'
          value={type} // "" initially
          onChange={(value) => {
            setType(value as CompostType);
            setErrors((prev) => ({ ...prev, type: '' }));
          }}
          options={COMPOST_TYPE_OPTIONS}
          error={errors.type}
        />

        {compostBinToEdit && (
          <RadioGroup<CompostStatus>
            name='compost-status'
            value={status}
            className='pb-5'
            onChange={(value) => setStatus(value as CompostStatus)}
            options={compostStatusOptions}
          />
        )}

        <FormField
          id='bin-notes'
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
