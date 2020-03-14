import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { StyledButton } from '../Button/style';
import { Props } from './';
import { ReactElement } from 'react';

const PrimaryButtonStyles = (props: Props): FlattenSimpleInterpolation => {
  const styles: (true | FlattenSimpleInterpolation)[] = props.children.map((child: ReactElement) => {
    if (child?.props.primary) {
      return css`
        &:not(:last-child) {
          margin-right: 1px;
        }
      `;
    }
    return true;
  });
  return styles as FlattenSimpleInterpolation;
};

export const ButtonGroupStyled = styled.div`
  ${StyledButton} {
    margin: 0;
    border-radius: 0;

    &:first-child {
      border-radius: 5px 0 0 5px;
      border-right: 0px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
      border-left: 0px;
    }
    &:active {
      transform: scale(1) !important;
    }
    ${(props): FlattenSimpleInterpolation => {
      return PrimaryButtonStyles(props as Props);
    }}
  }
`;
