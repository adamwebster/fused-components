import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

import { Props } from './';
import React from 'react';

export const Label = styled.span`
    margin-left: 5px;
    display:inline-block;
    ${(props: Props): false | FlattenSimpleInterpolation | undefined =>
      props.inError &&
      css`
        color: ${color.red};
      `}
    ${(props: Props): false | FlattenSimpleInterpolation | undefined =>
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

export const IconStyled = styled.span`
  color: ${color.primary};
  font-size: 15px;
  svg {
    width: 15px;
    top: 2px;
    position: relative;
  }
  ${(props: Props): false | FlattenSimpleInterpolation | undefined =>
    props.inError &&
    css`
      color: ${color.red};
    `}
  ${(props: Props): false | FlattenSimpleInterpolation | undefined =>
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
