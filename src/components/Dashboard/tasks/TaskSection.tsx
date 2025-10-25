import SectionHeader from '../../shared/SectionHeader';
import {
  Task,
  TaskCategory,
  TaskFrequency,
  ViewKey,
} from '../../../mocks/mockdata';
import PageHeader from '../../shared/PageHeader';
import { TaskList } from './TaskList';
import { TaskSidebar } from './TaskSideBar';
import { useTaskContext } from '../../../context/TaskContext';
import TaskFormModal from './TaskFormModal';
import { useState } from 'react';
import toast from 'react-hot-toast';

// import PlantingHistoryFilterWrapper from './PlantingHistoryFilterWrapper ';

export interface PlantingSectionProps {
  onNavigate: (view: ViewKey) => void;
  onOpenMenu: () => void;
}

const TaskSection: React.FC<PlantingSectionProps> = ({
  onNavigate,
  onOpenMenu,
}) => {
  //   const { filteredPlantings } = usePlantingHistoryContext();
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } =
    useTaskContext();
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

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
      <div className='flex justify-end mb-4'>
        <button
          type='button'
          onClick={handleAddTask}
          aria-haspopup='dialog'
          aria-expanded={isTaskFormModalOpen}
          className='bg-[#244225] text-white text-sm px-4 py-2 rounded hover:bg-[#356a3c] transition'
        >
          + Add Task
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
          <TaskSidebar />
        </aside>
      </div>
    </>
  );
};

export default TaskSection;
