import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const StyledTextarea = styled.textarea`
  border-radius: 5px;
  border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : '#fff')};
`;
