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
  className?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}
export const Alert = ({
  fcStyle,
  title,
  icon,
  borderRadius = true,
  children,
  className,
  onMouseOver,
  onMouseOut,
}: Props): ReactElement => {
  return (
    <FCThemeConsumer>
      {(themeContext): ReactNode => (
        <>
          <StyledAlert
            onMouseOver={(): void => onMouseOver && onMouseOver()}
            onMouseOut={(): void => onMouseOut && onMouseOut()}
            theme={themeContext.theme}
            borderRadius={borderRadius}
            className={className}
            fcStyle={fcStyle}
            role="alert"
          >
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
