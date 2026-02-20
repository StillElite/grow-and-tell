import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { faTimes, faPlus, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormField } from '../../../shared/forms/FormField';
import { toast } from 'react-hot-toast';
import { SelectFormField } from '../../../shared/forms/SelectFormField';
import { Task, TaskCategory, TaskFrequency } from '../../../../types/types';
import {
  TASK_CATEGORY_OPTIONS,
  TASK_FREQUENCY_OPTIONS,
} from '../../../../constants/tasks';

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (
    name: string,
    category: TaskCategory,
    frequency: TaskFrequency,
    id?: string,
  ) => void;
  taskToEdit?: Task | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSaveTask,
  taskToEdit,
}) => {
  const [name, setName] = useState(taskToEdit?.name ?? '');
  const [category, setCategory] = useState<TaskCategory | ''>(
    taskToEdit?.category || '',
  );
  const [frequency, setFrequency] = useState<TaskFrequency | ''>(
    taskToEdit?.frequency || '',
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setCategory(taskToEdit.category);
      setFrequency(taskToEdit.frequency);
    } else {
      setName('');
      setCategory('');
      setFrequency('');
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter a bed name.';
    }

    if (!category) {
      newErrors.category = 'Please select a category.';
    }

    if (!frequency) {
      newErrors.frequency = 'Please select a frequency.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveTask(
      name.trim(),
      category as TaskCategory,
      frequency as TaskFrequency,
    );
    toast.success(
      taskToEdit ? 'Task updated successfully!' : 'New task added!',
    );

    setName('');
    setCategory('');
    setFrequency('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setCategory('');
    setFrequency('');
    setErrors({});
    onClose();
  };

  const modalText = {
    title: taskToEdit ? 'Edit Task' : 'Add New Task',
    button: taskToEdit ? 'Update Task' : 'Add Task',
    description: taskToEdit
      ? 'Update the details of this gardening task.'
      : 'Start planning a new gardening task for your space.',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={modalText.title}
      role='dialog'
      className='relative w-full max-w-md mx-auto bg-white p-8 xs:rounded-lg shadow border border-gray-200 focus:outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
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
        <SelectFormField
          id='task-category'
          label='Select category'
          value={category}
          onChange={(value) => {
            setCategory(value);
            setErrors((prev) => ({ ...prev, category: '' }));
          }}
          options={TASK_CATEGORY_OPTIONS}
          error={errors.category}
        />
        <SelectFormField
          id='task-frequency'
          label='Select frequency'
          value={frequency}
          onChange={(value) => {
            setFrequency(value);
            setErrors((prev) => ({ ...prev, frequency: '' }));
          }}
          options={TASK_FREQUENCY_OPTIONS}
          error={errors.frequency}
        />
        <button
          type='submit'
          className='mt-2 w-full bg-orange-700 text-white font-semibold text-sm py-2 rounded hover:bg-orange-800 transition flex items-center justify-center'
        >
          <FontAwesomeIcon icon={faPlus} className='mr-2' aria-hidden='true' />
          {modalText.button}
        </button>
      </form>
    </Modal>
  );
};
