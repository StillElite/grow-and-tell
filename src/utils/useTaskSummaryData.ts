import { useTaskContext } from '../context/TaskContext';

export const useTaskSummaryData = () => {
  const { tasks } = useTaskContext();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const taskFrequencyNotComplete = {
    daily: tasks.filter((t) => t.frequency === 'daily' && !t.completed).length,
    weekly: tasks.filter((t) => t.frequency === 'weekly' && !t.completed)
      .length,
    monthly: tasks.filter((t) => t.frequency === 'monthly' && !t.completed)
      .length,
  };

  const isEmpty = totalTasks === 0;
  const allDone = totalTasks > 0 && completedTasks === totalTasks;

  return {
    totalTasks,
    completedTasks,
    percentage,
    taskFrequencyNotComplete,
    isEmpty,
    allDone,
  };
};
