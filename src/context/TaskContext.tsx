import { createContext, useContext, useState, ReactNode } from 'react';
import {
  tasks as initialTasks,
  Task,
  TaskCategory,
  TaskFrequency,
} from '../mocks/mockdata';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, category: string, frequency: string) => void;
  updateTask?: (task: Task) => void;
  deleteTask?: (taskId: string) => void;
  toggleComplete: (id: string, next: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (
    name: string,
    category: TaskCategory,
    frequency: TaskFrequency
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      category,
      frequency,
      completed: false,
      type: 'custom',
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const toggleComplete = (id: string, next: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: next } : task))
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
