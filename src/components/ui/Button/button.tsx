import React, { useContext, ReactNode, ReactElement } from 'react';
import { StyledButton, StyledIcon } from './style';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /** Sets the button to be a primary button */
  primary?: boolean;
  /** Set the style of the button */
  fcStyle?: fcStyles;
  /** Set the color of the button */
  buttonColor?: string;
  /** Set the button to be disabled */
  disabled?: boolean;
  /** Set the button to be in its loading state */
  isLoading?: boolean;
  /** Set the loading icon */
  loadingIcon?: object;
  /** Set the icon for the button */
  icon?: string;
  /**
   * @ignore
   */
  children?: ReactNode;
  /** What the button should be rendered as for example as="a" */
  as?: string;
}
const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      buttonColor,
      disabled = false,
      isLoading = false,
      primary,
      loadingIcon,
      icon,
      children,
      fcStyle,
      as,
      ...rest
    }: Props,
    ref,
  ): ReactElement => {
    const theme = useContext(FCTheme);
    let asProps = {};
    if (as === 'a') {
      asProps = {
        as,
        role: 'button',
      };
    }
    return (
      <StyledButton
        ref={ref}
        icon={icon}
        buttonColor={buttonColor}
        disabled={disabled || isLoading}
        primary={primary}
        fcStyle={fcStyle}
        theme={theme.theme}
        {...asProps}
        {...rest}
      >
        {isLoading && loadingIcon && <>{loadingIcon} </>}
        {icon && !isLoading && (
          <StyledIcon className="button-icon" fcStyle={fcStyle} primary={primary}>
            <Icon title="Icon Button" icon={icon} />
          </StyledIcon>
        )}
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
