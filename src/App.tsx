import styled from 'styled-components';
import Header from './components/Header/Header';
import Calendar from './components/Calendar/Calendar';
import { CalendarProvider } from './context/CalendarContext';
import { TaskProvider } from './context/TaskContext';
import SearchTask from './components/SearchTask/SearchTask';
import ShortCutHint from './components/ShortCutHint/ShortCutHint';

// styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
`;
function App() {
  return (
    <TaskProvider>
      <CalendarProvider>
        <Wrapper>
          <Header />
          <Calendar />
          <SearchTask />
          <ShortCutHint />
        </Wrapper>
      </CalendarProvider>
    </TaskProvider>
  );
}

export default App;
