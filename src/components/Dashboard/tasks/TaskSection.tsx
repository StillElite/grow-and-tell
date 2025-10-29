import SectionHeader from '../../shared/SectionHeader';
import {
  Task,
  TaskCategory,
  TaskFrequency,
  ViewKey,
} from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';
import { TaskList } from './TaskList';
import { TaskSummary } from './TaskSummary';
import { useTaskContext } from '../../../context/TaskContext';
import TaskFormModal from './TaskFormModal';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TaskSummaryFlyout } from './TaskSummaryFlyout';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const TaskSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } =
    useTaskContext();
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

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
    frequency: TaskFrequency
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
        imageSrc='/images/planting.png'
      />
      <div className='flex justify-end items-center gap-2 mb-4'>
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
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          toggleComplete={toggleComplete}
        />
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
