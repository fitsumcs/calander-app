import { Dayjs } from 'dayjs';
import { ICalendarViewMode } from './ICalendarViewMode';

export interface ICalendarContextProps {
  currentDate: Dayjs;
  viewMode: ICalendarViewMode;
  setViewMode: (mode: ICalendarViewMode) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  setCurrentDate: (date: Dayjs) => void;
}
