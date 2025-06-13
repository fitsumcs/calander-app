import { useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import styled from 'styled-components';

// styled components
const SearchInput = styled.input<{ $isVisible: boolean }>`
  position: fixed;
  top: 10px;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'hidden')};
  right: 200px;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  z-index: 999;
  background: white;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
const SearchTask = () => {
  const { setSearchText, isShowSearch, setIsShowSearch } = useTasks();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setIsShowSearch(true);
      }
      if (e.key === 'Escape') {
        setIsShowSearch(false);
        setSearchText('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {isShowSearch && (
        <SearchInput
          $isVisible={isShowSearch}
          autoFocus
          placeholder="Search tasks..."
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
    </>
  );
};

export default SearchTask;
