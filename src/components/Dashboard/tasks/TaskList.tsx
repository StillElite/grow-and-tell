import TaskCard from './TaskCard';
import { Task } from '../../../mocks/mockdata';

export interface TaskListProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  toggleComplete: (id: string, next: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  toggleComplete,
}: TaskListProps) => {
  return (
    <ul
      className='w-full space-y-3'
      aria-live='polite'
      aria-relevant='additions removals'
    >
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={toggleComplete}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};
