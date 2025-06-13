import styled from 'styled-components';

// Styled Components
const ButtonWrapper = styled.button<{ $active: boolean }>`
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background-color: ${({ $active }) => ($active ? '#ccc' : '#eee')};
      color: #000;
      font-weight: bold;
      cursor: pointer:
      border-radius: 4px;
      margin-right: 8px;
      transition: background-color 0.2s;
      
      &:hover {
      background-color: ${({ $active }) => ($active ? '#bbb' : '#ddd')};
      }
    `;

type Props = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};
const Button = ({ label, isActive, onClick }: Props) => {
  return (
    <ButtonWrapper $active={isActive} onClick={onClick}>
      {label}
    </ButtonWrapper>
  );
};
export default Button;
