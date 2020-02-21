import React, { ReactNode } from 'react';
import { ButtonGroupStyled } from './style';

export interface ButtonGroupProps {
    children: ReactNode
}

export const ButtonGroup = ({children}:ButtonGroupProps) =>
{
    return(
        <ButtonGroupStyled>{children}</ButtonGroupStyled>
    )
}
