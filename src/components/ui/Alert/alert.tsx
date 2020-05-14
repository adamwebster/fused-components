import React, { ReactNode, ReactElement } from 'react';
import { Icon } from '../../icon';
import { StyledAlert, Title, AlertContent } from './style';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Sets the style of the alert */
  fcStyle?: fcStyles;
  /** Sets the title for the alert */
  title?: string;
  /** Sets the icon for the alert */
  icon?: string;
  /** Sets the border radius for the alert */
  borderRadius?: boolean;
  /**
   * @ignore
   */
  children?: ReactNode;
  /**
   * @ignore
   */
  className?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}
const Alert = ({
  fcStyle,
  title,
  icon,
  borderRadius = true,
  children,
  className,
  onMouseOver,
  onMouseOut,
  ...rest
}: Props): ReactElement => {
  const iconComponent = <Icon className="notification-icon" aria-hidden icon={icon && icon} />;
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
            {...rest}
          >
            {title && (
              <header>
                {icon && iconComponent}
                <Title theme={themeContext.theme}>{title}</Title>
              </header>
            )}
            {children && (
              <AlertContent theme={themeContext.theme} fcStyle={fcStyle}>
                {children}
              </AlertContent>
            )}
          </StyledAlert>
        </>
      )}
    </FCThemeConsumer>
  );
};

export default Alert;
