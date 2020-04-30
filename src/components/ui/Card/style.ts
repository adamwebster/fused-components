import { color } from '../../../styles/styles';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Props } from './';

export const StyledCard = styled.div`
  border-radius: ${(props: Props): string | undefined => props.borderRadius};
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : color.lightest)};

  color: ${(props): string => (props.theme === 'dark' ? color.medium : 'inherit')};
  border: solid 1px ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  box-sizing: border-box;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;
