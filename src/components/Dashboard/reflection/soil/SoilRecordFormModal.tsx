import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormField } from '../../../shared/forms/FormField';
import { toast } from 'react-hot-toast';
import { Season, SoilRecord } from '../../../../mocks/mockdata';
import { SelectFormField } from '../../../shared/forms/SelectFormField';

interface SoilRecordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSoilRecord: (name: string, season: Season) => void;

  soilRecordToEdit?: SoilRecord | null;
}

const SoilRecordFormModal: React.FC<SoilRecordFormModalProps> = ({
  isOpen,
  onClose,
  onSaveSoilRecord,
  soilRecordToEdit,
}) => {
  const [name, setName] = useState('');
  const [season, setSeason] = useState<Season | ''>(
    soilRecordToEdit?.season ?? '',
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (soilRecordToEdit) {
      setName(soilRecordToEdit.name);
      setSeason(soilRecordToEdit.season);
    } else {
      setName('');
      setSeason('');
    }
  }, [soilRecordToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a bed name.';
    }

    if (!season) {
      newErrors.season = 'Please select a season.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveSoilRecord(name.trim(), season as Season);

    toast.success(
      soilRecordToEdit
        ? 'Soil record updated successfully!'
        : 'Soil record added successfully!',
    );

    setName('');
    setSeason('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setSeason('');
    setErrors({});
    onClose();
  };

  const modalText = {
    title: soilRecordToEdit ? 'Edit Soil Record' : 'Add New Soil Record',
    button: soilRecordToEdit ? 'Update Soil Record' : 'Add Soil Record',
    description: soilRecordToEdit
      ? 'Update the details of this soil record.'
      : 'Record a new soil health entry for your garden.',
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
        type='button'
        onClick={handleClose}
        aria-label='Close'
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a452c] rounded w-5 h-5'
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
          label='Bed Name'
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
          maxLength={24}
        />
        <SelectFormField
          id='soil-record-season'
          label='Select season'
          value={season}
          onChange={(value) => {
            setSeason(value as Season);
            setErrors((prev) => ({ ...prev, season: '' }));
          }}
          options={[
            { label: 'Spring', value: 'Spring' },
            { label: 'Summer', value: 'Summer' },
            { label: 'Fall', value: 'Fall' },
            { label: 'Winter', value: 'Winter' },
          ]}
          error={errors.season}
        />
        <button
          type='submit'
          className='mt-2 w-full bg-[#e9541e] text-white font-semibold text-sm py-2 rounded hover:bg-[#d34712] transition flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d34712] '
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' aria-hidden='true' />
          {modalText.button}
        </button>
      </form>
    </Modal>
  );
};

export default SoilRecordFormModal;
