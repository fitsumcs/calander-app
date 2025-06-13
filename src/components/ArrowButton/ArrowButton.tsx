import { Icon } from '@iconify/react';
import styled from 'styled-components';

// Styled Components
const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: 1px solid gray;
  color: black;
  padding: 0px;
  cursor: pointer;
  text-align: center;
`;

type Props = {
  direction: 'up' | 'down';
  onClick: () => void;
};
const ArrowButton = ({ direction, onClick }: Props) => {
  const icons: Record<string, string> = {
    up: 'codex:chevron-up',
    down: 'heroicons:chevron-down-20-solid',
  };
  return (
    <Button onClick={onClick}>
      <Icon icon={icons[direction]} fontSize={25} />
    </Button>
  );
};

export default ArrowButton;
