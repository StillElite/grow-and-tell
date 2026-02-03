import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import {
  faTimes,
  faPlus,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormField } from '../../../shared/forms/FormField';
import { toast } from 'react-hot-toast';
import { SelectFormField } from '../../../shared/forms/SelectFormField';
import { getHarvestUnit } from '../../../../utils/getHarvestUnit';
import { Harvest, HarvestCategory } from '../../../../types/types';
import { HARVEST_CATEGORY_OPTIONS } from '../../../../constants/harvest';

interface HarvestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveHarvest: (
    name: string,
    quantity: number,
    dateHarvested: string,
    category: HarvestCategory,
  ) => void;
  harvestToEdit?: Harvest | null;
}

const HarvestFormModal: React.FC<HarvestFormModalProps> = ({
  isOpen,
  onClose,
  onSaveHarvest,
  harvestToEdit,
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<HarvestCategory | ''>(
    harvestToEdit?.category ?? '',
  );
  const [dateHarvested, setDateHarvested] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (harvestToEdit) {
      setName(harvestToEdit.name);
      setQuantity(harvestToEdit.quantity.toString());
      setDateHarvested(harvestToEdit.dateHarvested);
      setCategory(harvestToEdit.category);
    } else {
      setName('');
      setQuantity('');
      setDateHarvested('');
      setCategory('');
    }
  }, [harvestToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a crop name.';
    }

    // Convert to number and validate
    const numericQuantity = parseFloat(quantity);
    if (!quantity.trim() || isNaN(numericQuantity) || numericQuantity <= 0) {
      newErrors.quantity = 'Please enter a valid amount.';
    }

    if (!dateHarvested.trim()) {
      newErrors.dateHarvested = 'Please enter a harvested date.';
    }

    if (!category) {
      newErrors.type = 'Please select a category.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveHarvest(
      name.trim(),
      numericQuantity,
      dateHarvested.trim(),
      category as HarvestCategory,
    );

    toast.success(
      harvestToEdit ? 'Harvest updated successfully!' : 'New harvest added!',
    );

    setName('');
    setQuantity('');
    setDateHarvested('');
    setCategory('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setQuantity('');
    setDateHarvested('');
    setCategory('');
    setErrors({});
    onClose();
  };

  const modalText = {
    title: harvestToEdit ? 'Edit Harvest' : 'Add New Harvest',
    button: harvestToEdit ? 'Update Harvest' : 'Add Harvest',
    description: harvestToEdit
      ? 'Update the details of this harvest entry.'
      : 'Record a new harvest from your garden.',
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
        className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a452c] focus-visible:rounded-md w-5 h-5'
      >
        <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
      </button>

      <h2
        id='modal-title'
        className='text-2xl font-bold text-center text-[#2a452c] mt-6 mb-2'
      >
        <FontAwesomeIcon
          icon={faShoppingBasket}
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
          id='harvest-dateHarvested'
          label='Date Harvested'
          value={dateHarvested}
          onChange={(value) => {
            setDateHarvested(value);
            setErrors((prev) => ({ ...prev, dateHarvested: '' }));
          }}
          type='date'
          error={errors.dateHarvested}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <SelectFormField
            id='harvest-category'
            label='Select category'
            value={category}
            onChange={(value) => {
              setCategory(value as HarvestCategory);
              setErrors((prev) => ({ ...prev, type: '' }));
            }}
            options={HARVEST_CATEGORY_OPTIONS}
            error={errors.type}
          />
          <div className={category ? '' : 'opacity-60'}>
            <FormField
              id='harvest-quantity'
              label={`Qty ${category ? `(${getHarvestUnit(category)})` : ''}`}
              value={quantity}
              onChange={(value) => {
                setQuantity(value);
                setErrors((prev) => ({ ...prev, quantity: '' }));
              }}
              type='number'
              min={0}
              error={errors.quantity}
              maxLength={24}
              disabled={!category}
            />
          </div>
        </div>

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

export default HarvestFormModal;
