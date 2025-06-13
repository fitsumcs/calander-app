import { createContext, useContext, useState } from 'react';
import { ICalendarContextProps } from '../model/ICalendarContextProps';
import dayjs from 'dayjs';
import { ICalendarViewMode } from '../model/ICalendarViewMode';

const CalendarContext = createContext<ICalendarContextProps | undefined>(
  undefined,
);

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (!context) throw new Error('useTasks must be used within a TaskProvider');

  return context;
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<ICalendarViewMode>('month');

  const goToNextMonth = () => {
    setCurrentDate((prev) =>
      viewMode === 'month' ? prev.add(1, 'month') : prev.add(1, 'week'),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate((prev) =>
      viewMode === 'month'
        ? prev.subtract(1, 'month')
        : prev.subtract(1, 'week'),
    );
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        goToNextMonth,
        goToPreviousMonth,
        setCurrentDate,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
