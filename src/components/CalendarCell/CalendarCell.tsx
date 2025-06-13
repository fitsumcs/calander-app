import { Dayjs } from 'dayjs';
import { useTasks } from '../../context/TaskContext';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ITask } from '../../model/ITask';
import { IHoliday } from '../../model/IHoliday';
import { useCalendar } from '../../context/CalendarContext';
import { getHolidays } from '../../utils/getHolidays';

const DayBox = styled.div`
  padding: 8px;
  border-radius: 3px;
  background-color: #e3e4e6;
`;

const TaskItem = styled.div`
  margin-top: 4px;
  padding: 8px;
  background: #ffffff;
  border-radius: 5px;
  cursor: grab;
  color: rgb(105, 104, 104);
`;

const Input = styled.input`
  width: 90%;
  margin-top: 8px;
  position: relative;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
  resize: none;
  overflow: hidden
  line-height: 1.5;
`;

const HolidayLabel = styled.div`
  font-size: 0.75rem;
  color: #b00020;
  font-weight: bold;
  margin-top: 4px;
`;

const CalendarCell: React.FC<{ date: Dayjs }> = ({ date }) => {
  const [taskInput, setTaskInput] = useState<string>('');
  const [taskBeingEdited, setTaskBeingEdited] = useState<ITask | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [holidays, setHolidays] = useState<IHoliday[]>([]);

  const calendarContext = useCalendar();
  const { currentDate } = calendarContext;
  const { tasks, addTask, moveTask, editTask } = useTasks();

  const dateKey = date.format('YYYY-MM-DD');
  const dailyTasks = tasks.filter((task: ITask) => task.date === dateKey);

  const isHoliday = holidays.find((h) => h.date === dateKey);

  useEffect(() => {
    const fetchHoliday = async () => {
      const holidays = await getHolidays(
        Number(currentDate.format('YYYY')),
        'US',
      );
      setHolidays(holidays);
    };
    fetchHoliday();
  }, [currentDate]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isHoliday) return;

    const taskId = e.dataTransfer.getData('taskId');
    const fromDate = e.dataTransfer.getData('fromDate');
    const toIndex = dragOverIndex ?? dailyTasks.length;

    moveTask(taskId, fromDate, dateKey, toIndex);
    setDragOverIndex(null);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (!taskBeingEdited) {
      setTaskInput(newText);
    } else {
      setTaskBeingEdited((prev) => (prev ? { ...prev, text: newText } : null));
      setTaskInput(newText);
    }
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskInput.trim()) {
      if (!taskBeingEdited) {
        addTask({
          id: (tasks.length + 1).toString(),
          text: taskInput,
          date: dateKey,
        });
        setTaskInput('');
      } else {
        editTask(taskBeingEdited);
        setTaskInput('');
        setTaskBeingEdited(null);
      }
    }
  };

  const onHandleEditTask = (task: ITask) => {
    setTaskInput(task.text);
    setTaskBeingEdited(task);
  };

  return (
    <DayBox onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div>{date.format('MMM D')}</div>
      {isHoliday ? (
        <HolidayLabel>{isHoliday.name}</HolidayLabel>
      ) : (
        <>
          <div>
            {dailyTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('taskId', task.id);
                  e.dataTransfer.setData('fromDate', task.date);
                }}
                onDragOver={(e) => onDragOver(e, index)}
                onClick={() => onHandleEditTask(task)}
              >
                {task.text}
              </TaskItem>
            ))}
          </div>
          <Input
            placeholder="Add task..."
            type="text"
            value={taskInput}
            onChange={onHandleInputChange}
            onKeyDown={onHandleKeyDown}
          />
        </>
      )}
    </DayBox>
  );
};

export default CalendarCell;
