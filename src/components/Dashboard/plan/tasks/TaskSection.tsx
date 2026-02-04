import SectionHeader from '../../../shared/SectionHeader';
import PageHeader from '../../../shared/PageHeader';
import { TaskList } from './TaskList';
import { TaskSummary } from './TaskSummary';
import { useTaskContext } from '../../../../context/TaskContext';
import { TaskFormModal } from './TaskFormModal';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { TaskSummaryFlyout } from './TaskSummaryFlyout';
import ConfirmModal from '../../../shared/ConfirmModal';
import { getAccentColor } from '../../../../utils/getAccentColor';
import {
  Task,
  TaskCategory,
  TaskFrequency,
  ViewKey,
} from '../../../../types/types';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const TaskSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompletedTasks,
  } = useTaskContext();
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { bgAccent } = getAccentColor(ViewKey.Tasks);

  const hasCompletedTasks = tasks.some((task) => task.completed);

  const visibleTasks = useMemo(
    () => tasks.filter((t) => !t.hidden), // ← hide hidden ones
    [tasks],
  );

  const buttonClasses = hasCompletedTasks
    ? 'bg-white hover:bg-gray-50 text-[#2a452c]'
    : 'bg-gray-200 text-gray-400';

  const confirmMessage = (
    <>
      Are you sure you want to <strong>clear all completed tasks</strong>?
    </>
  );

  // Open in ADD mode
  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsTaskFormModalOpen(true);
  };

  // Open in EDIT mode
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskFormModalOpen(true);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  // SAVE: decide add vs edit
  const handleSaveTask = (
    name: string,
    category: TaskCategory,
    frequency: TaskFrequency,
  ) => {
    if (taskToEdit) {
      updateTask({ ...taskToEdit, name, category, frequency });
    } else {
      addTask(name, category, frequency);
    }
    setIsTaskFormModalOpen(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast.success('Task deleted successfully');
  };
  const breadcrumbItems = [
    { label: 'Dashboard', onClick: () => onNavigate?.(ViewKey.Dashboard) },
    { label: 'Tasks' },
  ];

  const handleClearCompletedTasks = () => {
    clearCompletedTasks();
    setIsConfirmOpen(false);
    toast.success('All completed tasks have been cleared');
  };

  useEffect(() => {
    // Guard for SSR
    if (typeof window === 'undefined') return;

    // Use matchMedia instead of window.innerWidth so this only fires when crossing Tailwind's lg breakpoint
    // and stays in sync with CSS media queries (less noisy than resize)

    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsSummaryOpen(false);
    };

    // If we land on desktop while open, close immediately
    if (mql.matches) setIsSummaryOpen(false);

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [setIsSummaryOpen]);

  return (
    <>
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        onLogout={handleLogout}
        onOpenMenu={onOpenMenu}
      />
      <SectionHeader
        title='Tasks'
        description='Manage your gardening tasks and to-dos.'
        imageSrc='/images/clock-icon2.png'
      />
      <div className='flex justify-end items-center gap-2 mb-4'>
        <div className='relative group'>
          <button
            type='button'
            disabled={!hasCompletedTasks}
            onClick={() => setIsConfirmOpen(true)}
            className={`text-sm px-3 py-2 rounded-md border border-gray-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a452c]
              ${buttonClasses}`}
            aria-label='Clear all completed task checkmarks'
          >
            Clear Completed
          </button>
          {!hasCompletedTasks && (
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap rounded ${bgAccent} px-2 py-1 text-xs text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-10`}
            >
              No completed tasks to clear
            </span>
          )}
        </div>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleClearCompletedTasks}
          title='Clear All Tasks'
          message={confirmMessage}
        />
        <button
          type='button'
          onClick={handleAddTask}
          className='h-9 bg-[#244225] text-white text-sm px-4 rounded-md hover:bg-[#356a3c] transition'
        >
          + Add Task
        </button>
        <button
          type='button'
          onClick={() => setIsSummaryOpen(true)}
          aria-haspopup='dialog'
          aria-expanded={isSummaryOpen}
          className='text-sm px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50
             dark:bg-dark-bg dark:border-gray-600 dark:hover:bg-gray-800 lg:hidden'
        >
          Task Summary
        </button>
      </div>
      <TaskFormModal
        isOpen={isTaskFormModalOpen}
        onClose={() => setIsTaskFormModalOpen(false)}
        onSaveTask={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      <div className='mx-auto w-full grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px] 2xl:grid-cols-[minmax(0,1fr)_500px]'>
        {visibleTasks.length > 0 ? (
          <TaskList
            visibleTasks={visibleTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            toggleComplete={toggleComplete}
          />
        ) : (
          <div className='flex flex-col items-center justify-center py-12 text-center text-gray-500'>
            <h3 className='text-base font-semibold text-[#2a452c]'>
              No tasks yet
            </h3>
            <p className='mt-1 text-sm text-gray-600'>
              Add a task to start tracking what needs to get done.
            </p>
          </div>
        )}

        <aside className='hidden lg:block'>
          <div className=' rounded-lg border bg-white p-4 shadow-sm'>
            <TaskSummary />
          </div>
        </aside>
      </div>
      <TaskSummaryFlyout
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </>
  );
};

export default TaskSection;
