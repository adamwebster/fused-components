import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { StyledButton } from '../Button/style';
import { ReactElement } from 'react';

interface PBS {
  children: Array<ReactElement>;
}
const PrimaryButtonStyles = (props: PBS): FlattenSimpleInterpolation => {
  const styles: (true | FlattenSimpleInterpolation)[] = props.children.map((child: ReactElement) => {
    if (child.props.primary) {
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

interface BTS {
  children: Array<ReactElement>;
}
export const ButtonGroupStyled = styled.div<BTS>`
  ${StyledButton} {
    margin: 0;
    border-radius: 0;

    &:first-child {
      border-radius: 5px 0 0 5px;
      border-right: 0px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
    }
    ${(props): false | FlattenSimpleInterpolation | undefined =>
      props.children &&
      props.children.length > 2 &&
      css`
        &:last-child {
          border-left: 0px;
        }
      `}
    &:active {
      transform: scale(1) !important;
    }
    ${(props): FlattenSimpleInterpolation => {
      return PrimaryButtonStyles(props);
    }}
  }
`;
