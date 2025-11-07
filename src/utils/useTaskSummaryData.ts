import { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';

export const useTaskSummaryData = () => {
  const { tasks } = useTaskContext();

  const visibleTasks = useMemo(
    () => tasks.filter((task) => !task.hidden),
    [tasks]
  );

  const totalTasks = visibleTasks.length;
  const completedTasks = visibleTasks.filter((task) => task.completed).length;

  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const taskFrequencyNotComplete = {
    daily: visibleTasks.filter(
      (task) => task.frequency === 'daily' && !task.completed
    ).length,
    weekly: visibleTasks.filter(
      (task) => task.frequency === 'weekly' && !task.completed
    ).length,
    monthly: visibleTasks.filter(
      (task) => task.frequency === 'monthly' && !task.completed
    ).length,
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
