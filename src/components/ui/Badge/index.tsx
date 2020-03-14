import React, { ReactElement, ReactNode } from 'react';
import { StyledBadge } from './style';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';

export interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  children: ReactNode;
}
export const Badge = ({ fcStyle, ...rest }: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => <StyledBadge fcStyle={fcStyle} theme={themeContext?.theme} {...rest} />}
    </FCThemeConsumer>
  );
};
