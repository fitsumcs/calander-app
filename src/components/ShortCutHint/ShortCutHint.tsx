import styled from 'styled-components';

const ShortcutHintBox = styled.span`
  position: fixed;
  bottom: 10px;
  right: 20px;
  font-size: 13px;
  color: #555;
  padding: 6px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  b {
    font-weight: 600;
  }
`;
const ShortCutHint = () => {
  return (
    <ShortcutHintBox>
      <b>CTRL + F</b> to search and <b>Escape</b> to close
    </ShortcutHintBox>
  );
};

export default ShortCutHint;
