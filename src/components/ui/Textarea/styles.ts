import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const StyledTextarea = styled.textarea`
  border-radius: 5px;
  color: inherit;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  resize: vertical;
  outline: none;
  border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : '#fff')};
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};

  &:focus {
    border-color: ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.focus)};
    box-shadow: 0 0 6px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.focus)};
  }
`;
