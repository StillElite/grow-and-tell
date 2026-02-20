import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormField } from '../../../shared/forms/FormField';
import { SelectFormField } from '../../../shared/forms/SelectFormField';
import {
  SOIL_NUTRIENT_LEVELS,
  SOIL_PH_OPTIONS,
} from '../../../../constants/soil';
import toast from 'react-hot-toast';

export interface SoilTestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSoilTest: (soilTest: {
    dateTested: string;
    pH: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
  }) => void;
}

export const SoilTestFormModal: React.FC<SoilTestFormModalProps> = ({
  isOpen,
  onClose,
  onSaveSoilTest,
}) => {
  const [pH, setPH] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [dateTested, setDateTested] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const resetForm = () => {
    setDateTested('');
    setPH('');
    setNitrogen('');
    setPhosphorus('');
    setPotassium('');
  };
  const REQUIRED_ERROR = 'Please enter a value.';

  const fieldsToValidate: Record<string, string> = {
    dateTested,
    pH,
    nitrogen,
    phosphorus,
    potassium,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    Object.entries(fieldsToValidate).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = REQUIRED_ERROR;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveSoilTest({
      dateTested: dateTested.trim(),
      pH: pH.trim(),
      nitrogen: nitrogen.trim(),
      phosphorus: phosphorus.trim(),
      potassium: potassium.trim(),
    });

    toast.success('Soil test added successfully!');

    resetForm();
    onClose();
  };

  const handleClose = () => {
    setDateTested('');
    setPH('');
    setNitrogen('');
    setPhosphorus('');
    setPotassium('');
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
    title: 'Add New Soil Test',
    button: 'Add Soil Test',
    description: 'Record a new soil test entry for your garden.',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={modalText.title}
      role='dialog'
      className='relative w-full max-w-md mx-auto bg-white p-8 xs:rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
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
          id='soil-dateTested'
          label='Date Tested'
          value={dateTested}
          onChange={(value) => {
            setDateTested(value);
            setErrors((prev) => ({ ...prev, dateTested: '' }));
          }}
          type='date'
          error={errors.dateTested}
        />
        <div className='grid grid-cols-2 gap-4'>
          <SelectFormField
            id='soil-pH'
            label='pH'
            value={pH}
            onChange={(value) => {
              setPH(value as string);
              setErrors((prev) => ({ ...prev, pH: '' }));
            }}
            options={SOIL_PH_OPTIONS}
            error={errors.pH}
          />
          <SelectFormField
            id='soil-nitrogen'
            label='Nitrogen'
            value={nitrogen}
            onChange={(value) => {
              setNitrogen(value as string);
              setErrors((prev) => ({ ...prev, nitrogen: '' }));
            }}
            options={SOIL_NUTRIENT_LEVELS}
            error={errors.nitrogen}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <SelectFormField
            id='soil-phosphorus'
            label='Phosphorus'
            value={phosphorus}
            onChange={(value) => {
              setPhosphorus(value as string);
              setErrors((prev) => ({ ...prev, phosphorus: '' }));
            }}
            options={SOIL_NUTRIENT_LEVELS}
            error={errors.phosphorus}
          />
          <SelectFormField
            id='soil-potassium'
            label='Potassium'
            value={potassium}
            onChange={(value) => {
              setPotassium(value as string);
              setErrors((prev) => ({ ...prev, potassium: '' }));
            }}
            options={SOIL_NUTRIENT_LEVELS}
            error={errors.potassium}
          />
        </div>
        <button
          type='submit'
          className='mt-2 w-full bg-orange-700 text-white font-semibold text-sm py-2 rounded hover:bg-orange-800 transition flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d34712] '
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' aria-hidden='true' />
          {modalText.button}
        </button>
      </form>
    </Modal>
  );
};
