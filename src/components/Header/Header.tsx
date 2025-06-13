import styled from 'styled-components';
import ArrowButton from '../ArrowButton/ArrowButton';
import Button from '../Button/Button';
import { useCalendar } from '../../context/CalendarContext';
import { ICalendarViewMode } from '../../model/ICalendarViewMode';

// Styled Components
const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ArrowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ToggleButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const CurrentYear = styled.span`
  font-weight: bold;
  font-size: 1.2em;
`;

const Header = () => {
  const calendarContext = useCalendar();

  if (!calendarContext) {
    return <span>Unable to get calendar context</span>; // or render a fallback UI
  }

  const {
    currentDate,
    goToNextMonth,
    goToPreviousMonth,
    viewMode,
    setViewMode,
  } = calendarContext;

  const onToggleView = (label: string) => {
    setViewMode(label as ICalendarViewMode);
  };
  return (
    <HeaderWrapper>
      <ArrowButtonContainer>
        <ArrowButton direction="up" onClick={goToPreviousMonth} />
        <ArrowButton direction="down" onClick={goToNextMonth} />
      </ArrowButtonContainer>

      <CurrentYear>{currentDate.format('MMMM YYYY')}</CurrentYear>

      <ToggleButton>
        <Button
          isActive={viewMode === 'week' ? true : false}
          onClick={() => onToggleView('week')}
          label="Week"
        />
        <Button
          isActive={viewMode === 'month' ? true : false}
          onClick={() => onToggleView('month')}
          label="Month"
        />
      </ToggleButton>
    </HeaderWrapper>
  );
};

export default Header;
