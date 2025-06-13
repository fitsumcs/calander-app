import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCalendar } from '../../context/CalendarContext';
import CalendarCell from '../CalendarCell/CalendarCell';
import { ICalendarContextProps } from '../../model/ICalendarContextProps';
import dayjs, { Dayjs } from 'dayjs';
import { useTasks } from '../../context/TaskContext';

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  padding-bottom: 8px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Calendar: React.FC = () => {
  const { currentDate, viewMode, setCurrentDate }: ICalendarContextProps =
    useCalendar();
  const { searchText, tasks } = useTasks();

  let days: Dayjs[] = [];

  if (viewMode === 'month') {
    const start = currentDate.startOf('month').startOf('week');
    days = Array.from({ length: 42 }, (_, i) => start.add(i, 'day'));
  } else if (viewMode === 'week') {
    const start = currentDate.startOf('week');
    days = Array.from({ length: 7 }, (_, i) => start.add(i, 'day'));
  }

  const weekdayLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // update calendar for search tasks
  useEffect(() => {
    const searchedTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (searchedTasks.length > 0) {
      setCurrentDate(dayjs(searchedTasks[0].date.toString()));
    }
  }, [searchText]);

  return (
    <>
      <WeekdayRow>
        {weekdayLabels.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </WeekdayRow>

      <CalendarGrid>
        {days.map((date, index) => (
          <CalendarCell key={index} date={date} />
        ))}
      </CalendarGrid>
    </>
  );
};

export default Calendar;
