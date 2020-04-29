import React, { ReactNode, ReactElement } from 'react';
import { Icon } from '../../icon';
import { StyledAlert, Title, AlertContent } from './style';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';
export interface Props {
  /** Sets the style of the alert */
  fcStyle?: fcStyles;
  /** Sets the title for the alert */
  title?: string;
  /** Sets the icon for the alert */
  icon?: string;
  /** Sets the border radius for the alert */
  borderRadius?: boolean;
  children?: ReactNode;
}
export const Alert = ({ fcStyle, title, icon, borderRadius = true, children }: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <>
          <StyledAlert theme={themeContext.theme} borderRadius={borderRadius} fcStyle={fcStyle}>
            {title && (
              <h4>
                {icon && <Icon icon={icon} />} <Title theme={themeContext.theme}>{title}</Title>
              </h4>
            )}
            {children && <AlertContent fcStyle={fcStyle}>{children}</AlertContent>}
          </StyledAlert>
        </>
      )}
    </FCThemeConsumer>
  );
};
