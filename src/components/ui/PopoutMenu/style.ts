import styled from 'styled-components';
import { color } from '../../../styles/styles';

interface CM extends React.HTMLAttributes<HTMLUListElement> {
  ref?: any;
  fitWidthToContent?: boolean;
}

export const PopOutMenuStyled = styled.ul<CM>`
  position: absolute;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  margin: 0;
  padding: 0;
  width: ${({ fitWidthToContent }) => (fitWidthToContent ? 'fit-content' : '100%')};
  list-style: none;
  z-index: 99;
  border-radius: 5px;
  overflow: hidden;
`;
