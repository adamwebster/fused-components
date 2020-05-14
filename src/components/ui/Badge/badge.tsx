import React, { ReactElement, ReactNode } from 'react';
import { StyledBadge } from './style';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  /**
   * @ignore
   */
  children: ReactNode;
}
const Badge = ({ fcStyle, ...rest }: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => <StyledBadge fcStyle={fcStyle} theme={themeContext.theme} {...rest} />}
    </FCThemeConsumer>
  );
};

export default Badge;
