import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../../mocks/mockdata';
import {
  getCategoryColor,
  getCategoryLabel,
  getFrequencyLabel,
} from '../../../utils/taskFormatter';
import { useState } from 'react';
import ConfirmModal from '../../shared/ConfirmModal';
import { capitalize } from '../../../utils/capitalize';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, next: boolean) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const confirmMessage = (
    <>
      Are you sure you want to remove <strong>{task.name}</strong>?
    </>
  );
  const isDone = task.completed;
  const inputClasses = `
  peer appearance-none w-5 h-5 border bg-white
  checked:bg-[#d1a052]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[#d1a052]
`;

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    setIsConfirmOpen(false);
  };

  return (
    <li
      className={`flex items-center justify-between border bg-white px-4 py-3 shadow-sm`}
    >
      {/* Left: checkbox + text */}
      <div className='flex items-center gap-3 ali'>
        <div className='flex items-center '>
          <label className='mt-0.5 inline-grid h-5 w-5 place-items-center'>
            <span className='relative w-5 h-5 flex-shrink-0'>
              <input
                id={`task-${task.id}-checkbox`}
                type='checkbox'
                checked={isDone}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className={inputClasses}
                aria-labelledby={`task-${task.id}-label`}
                aria-describedby={`task-${task.id}-meta`}
              />
              <FontAwesomeIcon
                icon={faCheck}
                aria-hidden='true'
                className='w-4 h-4 text-white absolute pointer-events-none opacity-0 scale-75 transition-all duration-200 ease-out peer-checked:opacity-100 left-0 top-0 m-0.5'
              />
            </span>
          </label>
        </div>

        <div className=' border-l border-gray-100 pl-3'>
          <div
            id={`task-${task.id}-label`}
            className={`text-sm font-medium mb-1 ${
              isDone ? 'line-through opacity-70' : ''
            }`}
          >
            {capitalize(task.name)}
          </div>

          <div
            id={`task-${task.id}-meta`}
            className='flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300'
          >
            <span className='flex items-center gap-1'>
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${getCategoryColor(
                  task.category
                )}`}
              />
              {getCategoryLabel(task.category)}
            </span>

            <span>&bull;</span>

            <span className='rounded-full border px-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'>
              {getFrequencyLabel(task.frequency)}
            </span>
            {task.type === 'default' && (
              <span className='px-2 py-0.5 text-xs rounded-full bg-[#dff5e1] text-[#2a452c]'>
                default
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: actions for user-created tasks */}
      {task.type === 'custom' && (
        <div className='flex items-center gap-2 text-gray-500'>
          <button
            type='button'
            aria-label='Edit task'
            onClick={() => {
              onEditTask(task);
            }}
            className='hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d1a052]'
            title='Edit'
          >
            <FontAwesomeIcon
              aria-hidden='true'
              icon={faPen}
              className='h-3 w-3'
            />
          </button>

          <button
            type='button'
            aria-label='Delete task'
            onClick={() => setIsConfirmOpen(true)}
            className='hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d1a052]'
            title='Delete'
          >
            <FontAwesomeIcon
              aria-hidden='true'
              icon={faTrash}
              className='h-3 w-3'
            />
          </button>
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleDeleteTask}
            confirmLabel='Remove Task'
            title='Remove Task'
            message={confirmMessage}
          />
        </div>
      )}
    </li>
  );
};

export default TaskCard;
