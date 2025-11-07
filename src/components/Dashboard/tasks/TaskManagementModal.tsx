import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTaskContext } from '../../../context/TaskContext';
import { useEffect, useMemo, useState } from 'react';

export interface TaskManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskManagementModal: React.FC<TaskManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { tasks, toggleDefaultTaskVisibility, setTaskCompleted } =
    useTaskContext();
  const [restoreApplied, setRestoreApplied] = useState(false);

  const defaultTasks = useMemo(
    () => tasks.filter((task) => task.type === 'default'),
    [tasks]
  );
  const [visibilityState, setVisibilityState] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (!isOpen) return;

    const initialVisibilityState: Record<string, boolean> = {};

    defaultTasks.forEach((task) => {
      initialVisibilityState[task.id] = task.hidden ? false : true;
    });

    setVisibilityState(initialVisibilityState);
  }, [isOpen, defaultTasks]);

  const handleToggleVisibility = (taskId: string) => {
    setVisibilityState((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
    setRestoreApplied(false);
  };

  const handleSelectAll = () => {
    setVisibilityState((prev) =>
      Object.fromEntries(Object.keys(prev).map((id) => [id, true]))
    );
    setRestoreApplied(false);
  };

  const handleClearAll = () => {
    setVisibilityState((prev) =>
      Object.fromEntries(Object.keys(prev).map((id) => [id, false]))
    );
    setRestoreApplied(false);
  };

  const handleRestoreFactory = () => {
    setVisibilityState(
      Object.fromEntries(
        defaultTasks.map((task) => [task.id, !task.factoryHidden])
      )
    );
    setRestoreApplied(true);
  };

  const handleSave = () => {
    defaultTasks.forEach(({ id, hidden }) => {
      const updatedHidden = !visibilityState[id]; // checkbox true = show → hidden false

      if (hidden !== updatedHidden) {
        toggleDefaultTaskVisibility(id, updatedHidden);
      }
    });

    if (restoreApplied) {
      defaultTasks.forEach((task) => {
        if (task.completed) setTaskCompleted(task.id, false);
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldReturnFocusAfterClose
      contentLabel='Manage Default Tasks'
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

      {/* Header */}
      <h2
        id='manage-defaults-title'
        className='text-lg font-semibold text-[#2a452c] mb-1'
      >
        Manage Default Tasks
      </h2>
      <p
        id='manage-defaults-desc'
        className='text-sm text-gray-600 dark:text-gray-300 mb-4'
      >
        Uncheck any default tasks you don't want to appear in your list. You can
        re-enable them anytime.
      </p>

      {/* Top controls (static for now) */}
      <div className='mb-3 flex items-center gap-2'>
        <button
          type='button'
          aria-controls='manage-defaults-fieldset'
          className='text-xs px-2 py-1 rounded border border-[#cbbf9c] text-[#4a4220] bg-[#faf9f5] hover:bg-[#f3efe5] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]'
          onClick={handleSelectAll}
        >
          Select all
        </button>
        <button
          type='button'
          aria-controls='manage-defaults-fieldset'
          className='text-xs px-2 py-1 rounded border border-[#cbbf9c] text-[#4a4220] bg-[#faf9f5] hover:bg-[#f3efe5] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]'
          onClick={handleClearAll}
        >
          Clear all
        </button>
      </div>

      {/* Default tasks list (hard-coded) */}
      <fieldset
        id='manage-defaults-fieldset'
        aria-labelledby='manage-defaults-title'
        className='max-h-72 overflow-auto rounded-md border border-gray-200 dark:border-gray-700'
      >
        <legend className='sr-only'>Default tasks</legend>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {defaultTasks.map((task) => (
            <li
              key={task.id}
              className='p-3 flex items-start justify-between gap-4'
            >
              <label className='flex-1 cursor-pointer'>
                <span className='block text-sm font-medium'>{task.name}</span>
                <span className='block text-xs text-gray-600 dark:text-gray-400'>
                  {task.category} &bull; {task.frequency}
                </span>
              </label>
              <input
                id={`show-${task.id}`}
                type='checkbox'
                className='mt-1 h-4 w-4'
                checked={!!visibilityState[task.id]}
                aria-label={`Show "${task.name}" in task list`}
                onChange={() => handleToggleVisibility(task.id)}
              />
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Footer actions */}
      <div className='mt-4 flex items-center justify-between'>
        <button
          type='button'
          className='text-sm px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-[#e9541e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]'
          onClick={handleRestoreFactory}
        >
          Reset defaults
        </button>

        <div className='flex gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='text-sm px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]'
          >
            Close
          </button>
          <button
            type='button'
            className='text-sm px-4 py-2 rounded-md text-white bg-[#7fb347] hover:bg-[#6ea13e] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]'
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskManagementModal;
