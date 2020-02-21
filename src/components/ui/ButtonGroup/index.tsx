import React from 'react';
import { ButtonGroupStyled } from './style';

export interface Props {
    children: any
}

export const ButtonGroup = ({children}:Props) =>
{
    return(
        <ButtonGroupStyled>{children}</ButtonGroupStyled>
    )
}
