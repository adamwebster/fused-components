import styled from 'styled-components';
import PopOutMenu from '../PopoutMenu/PopOutMenu';
import { Props as PopOutMenuProps } from '../PopoutMenu/PopOutMenu';
export const DatePickerWrapper = styled.div`
  position: relative;
`;

export const CalendarMenu = styled(PopOutMenu)<PopOutMenuProps>`
  padding: 10px;
`;
