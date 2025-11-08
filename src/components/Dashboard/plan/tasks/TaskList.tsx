import TaskCard from './TaskCard';
import { Task } from '../../../../mocks/mockdata';
import { useMemo } from 'react';

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
  const visibleTasks = useMemo(
    () => tasks.filter((t) => !t.hidden), // ← hide hidden ones
    [tasks]
  );

  return (
    <ul
      className='w-full space-y-3'
      aria-live='polite'
      aria-relevant='additions removals'
    >
      {visibleTasks.map((task: Task) => (
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
