import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  inError?: boolean;
}
export const StyledTextarea = styled.textarea<TextareaProps>`
  border-radius: 5px;
  color: inherit;
  font-family: inherit;
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

  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inError &&
    css`
      border: solid 1px ${color.red};
      &:focus {
        border-color: ${color.red};
        box-shadow: 0 0 6px ${color.red};
      }
    `}
`;
