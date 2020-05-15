import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { lighten } from 'polished';

import React from 'react';

interface LabelProps {
  inError: boolean;
  inWarning: boolean;
}
export const Label = styled.span<LabelProps>`
    margin-left: 5px;
    display:inline-block;
    ${(props): false | FlattenSimpleInterpolation | undefined =>
      props.inError &&
      css`
        color: ${props.theme === 'dark' ? lighten(0.25, color.danger) : color.danger};
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

interface IconSProps {
  inError: boolean;
  inWarning: boolean;
}
export const IconStyled = styled.span<IconSProps>`
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
      color: ${props.theme === 'dark' ? lighten(0.25, color.danger) : color.danger};
    `}
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.inWarning &&
    css`
      color: ${color.yellow};
    `}
`;

interface RI extends React.HTMLProps<HTMLInputElement> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const RadioInput = styled.input<RI>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;
