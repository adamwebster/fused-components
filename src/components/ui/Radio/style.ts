import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

import { Props } from './';
import  React from 'react';

export const Label = styled.span`
    margin-left: 5px;
    display:inline-block;
    ${(props:Props) => props.inError && css`
        color: ${color.red};
    `}
    ${(props:Props) => props.inWarning && css`
        color: ${color.yellow};
    `}
`

export const IconStyled = styled.span`
    color: ${color.primary};
    font-size: 15px;
    svg{
       width: 15px;
       top:2px;
       position:relative;
   }
    ${(props:Props) => props.inError && css`
        color: ${color.red};
    `}
    ${(props:Props) => props.inWarning && css`
        color: ${color.yellow};
    `}
`

interface IRadioInput extends React.HTMLProps<HTMLInputElement>{
    checked: boolean;
} 
export const RadioInput = styled.input<IRadioInput>`
position: absolute;
opacity: 0;
cursor: pointer;
`