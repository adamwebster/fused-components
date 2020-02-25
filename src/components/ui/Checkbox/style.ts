import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

import { Props } from './';

interface Label extends React.HTMLProps<HTMLElement> {
    inError?: boolean;
    inWarning?: boolean;
    theme?: string;
}
export const Label = styled.span<Label>`
    margin-left: 5px;
    display:inline-block;
    ${props => props.inError && css`
        color: ${color.red};
    `}
    ${props => props.inWarning && css`
        color: ${color.yellow};
    `}
    ${props => (props.theme === 'dark' && !props.inWarning && !props.inError) && css`
        color: ${color.medium};
    `}
`
interface IIconStyled extends React.HTMLProps<HTMLElement> {
    inError?: boolean;
    inWarning?: boolean;
    theme?: string;
}
export const IconStyled = styled.span<IIconStyled>`
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

interface ICheckboxInput extends React.HTMLProps<HTMLInputElement> {
    checked: boolean,
    onChange: () => void,
}
export const CheckInput = styled.input<ICheckboxInput>`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`
