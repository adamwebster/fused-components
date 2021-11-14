import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseButton } from './types';
export interface ButtonProps extends BaseButton, ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
