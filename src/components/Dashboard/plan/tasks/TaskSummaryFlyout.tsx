import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TaskSummary } from './TaskSummary';

interface TaskSummaryFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskSummaryFlyout: React.FC<TaskSummaryFlyoutProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden='true'
      />

      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-labelledby='task-summary-title'
      >
        <TaskSummary />
        <button
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='absolute top-4 right-8 text-gray-500 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-[#2a452c] focus-visible:rounded-md w-5 h-5'
        >
          <FontAwesomeIcon icon={faTimes} aria-hidden='true' />
        </button>
      </aside>
    </>
  );
};
