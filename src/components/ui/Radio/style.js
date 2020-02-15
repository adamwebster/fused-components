import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

export const Label = styled.span`
    margin-left: 5px;
    display:inline-block;
    ${props => props.inError && css`
        color: ${color.red};
    `}
    ${props => props.inWarning && css`
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
    ${props => props.inError && css`
        color: ${color.red};
    `}
    ${props => props.inWarning && css`
        color: ${color.yellow};
    `}
`

export const RadioInput = styled.input`
position: absolute;
opacity: 0;
cursor: pointer;
`