import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  icon?: string;
  inError?: boolean;
  inWarning?: boolean;
  theme: string;
}
export const StyledInput = styled.input<InputProps>`
width: 100%;
height:34px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
border-radius:5px;
-webkit-appearance: none;
background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
color: ${(props): string => (props.theme === 'dark' ? color.medium : 'inherit')};

&::placeholder{
  font-style:italic; 
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeMediumLight : color.mediumdark)};
}

&:focus{
  border-color:${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.focus)};
  box-shadow: 0 0 6px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.focus)};
}
&[disabled]{
  cursor: not-allowed;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : '#e9e9e9')};

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

${(props): false | FlattenSimpleInterpolation | undefined =>
  props.inWarning &&
  css`
    border: solid 1px ${color.yellow};
    &:focus {
      border-color: ${color.yellow};
      box-shadow: 0 0 6px ${color.yellow};
    }
  `}

${(props): '' | FlattenSimpleInterpolation | undefined =>
  props.icon &&
  css`
    padding-left: 35px;
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
`;

interface IconWrappersProps {
  inError: boolean;
  inWarning: boolean;
  theme: string;
}

export const IconWrapper = styled.span<IconWrappersProps>`
  position: absolute;
  left: 10px;
  top: 7px;
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.mediumdark)};
  border-right: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  box-sizing: border-box;

  svg {
    top: 2px;
    position: relative;
    margin-right: 5px;
    width: 12px;
  }
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inError &&
    css`
      color: ${color.red};
      border-color: ${color.red};
    `}
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inWarning &&
    css`
      color: ${color.yellow};
      border-color: ${color.yellow};
    `}
`;
