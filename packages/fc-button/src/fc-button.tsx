import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton } from './fc-button.styles';
import { BaseButton } from './types';

export interface ButtonProps extends BaseButton, ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, buttonSize = 'medium', buttonType = 'primary', ...rest }, ref) => (
    <StyledButton ref={ref} buttonType={buttonType} buttonSize={buttonSize} {...rest}>
      {children}
    </StyledButton>
  ),
);

Button.displayName = 'Button';

export default Button;
