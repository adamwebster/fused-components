import styled from 'styled-components';
import { color } from '../../../styles/styles';

interface DMS {
  menuOpen?: boolean;
}
export const CalendarMenu = styled.ul<DMS>`
  padding: 10px;
  position: absolute;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  overflow: hidden;
  border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  min-width: 200px;
  margin: 0;
  list-style: none;
  z-index: 99;
  margin-top: 5px;
  border-radius: 5px;
`;
