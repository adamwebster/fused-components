import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

interface Label extends React.HTMLProps<HTMLElement> {
  inError?: boolean;
  inWarning?: boolean;
  theme?: string;
}
export const Label = styled.span<Label>`
    margin-left: 5px;
    display:inline-block;
    ${(props): false | FlattenSimpleInterpolation | undefined =>
      props.inError &&
      css`
        color: ${color.red};
      `}
      ${(props): false | FlattenSimpleInterpolation | undefined =>
        props.inWarning &&
        css`
          color: ${color.yellow};
        `}
      ${(props): false | FlattenSimpleInterpolation | undefined =>
        props.theme === 'dark' &&
        !props.inWarning &&
        !props.inError &&
        css`
          color: ${color.medium};
        `}
`;
interface IconProps extends React.HTMLProps<HTMLElement> {
  inError?: boolean;
  inWarning?: boolean;
  theme?: string;
}
export const IconStyled = styled.span<IconProps>`
  color: ${color.primary};
  font-size: 15px;
  svg {
    width: 15px;
    top: 2px;
    position: relative;
  }
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inError &&
    css`
      color: ${color.red};
    `}
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inWarning &&
    css`
      color: ${color.yellow};
    `}
`;

interface CBI extends React.HTMLProps<HTMLInputElement> {
  checked: boolean;
  onChange: () => void;
}
export const CheckInput = styled.input<CBI>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;
