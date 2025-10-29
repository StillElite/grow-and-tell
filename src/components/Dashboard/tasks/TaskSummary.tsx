import { useTaskSummaryData } from '../../../utils/useTaskSummaryData';

export const TaskSummary: React.FC = () => {
  const { totalTasks, completedTasks, percentage, taskFrequencyNotComplete } =
    useTaskSummaryData();

  console.log('taskFrequencyCounts', taskFrequencyNotComplete);

  return (
    <div className='relative flex flex-col bg-white shadow-sm'>
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
        <section className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg p-4'>
          <p className='text-sm text-gray-700 dark:text-gray-300 mb-2'>
            {`Completed: ${completedTasks} / ${totalTasks} (${percentage.toFixed(
              0
            )}%)`}
          </p>
          <div className='h-2 rounded-full bg-gray-200 overflow-hidden'>
            <div
              className='h-2 rounded-full bg-[#2a452c]'
              style={{ width: `${percentage}%` }}
            />
          </div>
        </section>
        <section className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg p-4'>
          <h3 className='text-md font-medium text-gray-900 dark:text-gray-100 mb-2'>
            Remaining by Frequency
          </h3>
          <ul className='text-sm text-gray-700 dark:text-gray-300 space-y-2'>
            <li>Daily - {taskFrequencyNotComplete.daily}</li>
            <li>Weekly - {taskFrequencyNotComplete.weekly}</li>
            <li>Monthly - {taskFrequencyNotComplete.monthly}</li>
          </ul>
        </section>
        <div className='mt-4'>
          <button
            type='button'
            onClick={() => alert('Manage Defaults (placeholder)')}
            className='w-full text-sm px-4 py-2 rounded-md text-white bg-[#7fb347] hover:bg-[#6ea13e] shadow-sm'
          >
            Manage Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
