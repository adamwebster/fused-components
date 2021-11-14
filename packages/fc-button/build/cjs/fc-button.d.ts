import React, { HtmlHTMLAttributes, ReactNode } from 'react';
export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
