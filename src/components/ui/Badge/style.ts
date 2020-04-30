import styled from 'styled-components';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';

export interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme: unknown;
}
export const StyledBadge = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : 'transparent')};
  border: solid 1px
    ${(props: Props): string => {
      switch (props.fcStyle) {
        case 'danger':
          return color.danger;
        case 'warning':
          return color.warning;
        case 'info':
          return color.info;
        case 'success':
          return color.success;
        default:
          return props.theme === 'dark' ? color.medium : '#333';
      }
    }};
  color: ${(props): string => (props.theme === 'dark' ? color.medium : '#333')};
`;
