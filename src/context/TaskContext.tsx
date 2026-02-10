import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { tasks as initialTasks } from '../constants/tasks';
import { Task, TaskCategory, TaskFrequency } from '../types/types';

const STORAGE_KEY = 'grow-tell:tasks';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, category: string, frequency: string) => void;
  updateTask?: (task: Task) => void;
  deleteTask?: (taskId: string) => void;
  toggleComplete: (id: string, next: boolean) => void;
  toggleDefaultTaskVisibility?: (taskId: string, hidden: boolean) => void;
  setTaskCompleted: (taskId: string, completed: boolean) => void;
  clearCompletedTasks?: () => void;
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

const loadFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTasks;
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return initialTasks;
  }
};

const saveToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoaded, setLoaded] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const loaded = loadFromStorage();
    setTasks(loaded);
    setLoaded(true);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  const addTask = (
    name: string,
    category: TaskCategory,
    frequency: TaskFrequency,
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
      category,
      frequency,
      completed: false,
      type: 'custom',
      hidden: false,
      factoryHidden: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: string, next: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: next } : task,
      ),
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const setTaskCompleted = (taskId: string, completed: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed } : task)),
    );
  };

  const toggleDefaultTaskVisibility = (taskId: string, hidden: boolean) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, hidden } : task)),
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.completed ? { ...task, completed: false } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
        toggleDefaultTaskVisibility,
        setTaskCompleted,
        clearCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
