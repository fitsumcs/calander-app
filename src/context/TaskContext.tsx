import React, { createContext, useContext, useState } from 'react';
import { ITaskContextProps } from '../model/ITaskContextProps';
import { ITask } from '../model/ITask';

const TaskContext = createContext<ITaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');

  const addTask = (task: ITask) => {
    setTasks((prev) => [...prev, task]);
  };

  const editTask = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  const moveTask = (
    taskId: string,
    fromDate: string,
    toDate: string,
    toIndex: number,
  ) => {
    setTasks((prev) => {
      // Get all tasks for fromDate
      const fromTasks = prev.filter((task) => task.date === fromDate);

      // Find the task to move
      const taskToMove = fromTasks.find((task) => task.id === taskId);
      if (!taskToMove) return prev;

      // Moving within the same day (reordering)
      if (fromDate === toDate) {
        const reordered = [...fromTasks];
        const oldIndex = reordered.findIndex((task) => task.id === taskId);
        if (oldIndex === -1) return prev;

        // Remove from old index and insert at new index
        reordered.splice(oldIndex, 1);
        reordered.splice(toIndex, 0, taskToMove);

        // Replace the reordered list in the overall task list
        return [...prev.filter((task) => task.date !== fromDate), ...reordered];
      }

      // Moving to a different date
      return prev.map((task) =>
        task.id === taskId ? { ...task, date: toDate } : task,
      );
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isShowSearch,
        searchText,
        addTask,
        moveTask,
        setIsShowSearch,
        setSearchText,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');

  return context;
};
