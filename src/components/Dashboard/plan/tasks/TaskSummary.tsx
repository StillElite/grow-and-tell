import { useState } from 'react';
import { useTaskSummaryData } from '../../../../utils/useTaskSummaryData';
import { TaskManagementModal } from './TaskManagementModal';

export const TaskSummary: React.FC = () => {
  const { totalTasks, completedTasks, percentage, taskFrequencyNotComplete } =
    useTaskSummaryData();

  const [isTaskManagementModalOpen, setIsTaskManagementModalOpen] =
    useState(false);

  return (
    <div className='relative flex flex-col'>
      {/* Header */}
      <div className='px-6 py-4'>
        <h2
          id='task-summary-title'
          className='text-lg font-semibold text-[#2a452c]'
        >
          Task Summary
        </h2>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto px-6 space-y-4'>
        <div className='rounded-lg border border-gray-200 bg-white p-4'>
          <p className='text-sm text-gray-700 mb-2'>
            Completed: {completedTasks} / {totalTasks} ({percentage.toFixed(0)}
            %)
          </p>
          <div
            role='progressbar'
            aria-label='Task completion progress'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(percentage)}
            className='h-2 rounded-full bg-gray-200 overflow-hidden'
          >
            <div
              className='h-2 rounded-full bg-[#2a452c]'
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-4'>
          <h3 className='text-md font-medium text-gray-900 mb-2'>
            Remaining by Frequency
          </h3>
          <ul className='text-sm text-gray-700 space-y-2'>
            <li>Daily - {taskFrequencyNotComplete.daily}</li>
            <li>Weekly - {taskFrequencyNotComplete.weekly}</li>
            <li>Monthly - {taskFrequencyNotComplete.monthly}</li>
          </ul>
        </div>
        <div className='mt-4'>
          <button
            type='button'
            onClick={() => setIsTaskManagementModalOpen(true)}
            className='w-full text-sm px-4 py-2 rounded-md text-white bg-[#557C2D] hover:bg-[#6ea13e] shadow-sm'
          >
            Manage Defaults
          </button>
        </div>
        <TaskManagementModal
          isOpen={isTaskManagementModalOpen}
          onClose={() => setIsTaskManagementModalOpen(false)}
        />
      </div>
    </div>
  );
};
