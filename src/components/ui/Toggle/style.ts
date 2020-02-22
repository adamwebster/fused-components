import styled, { css } from 'styled-components';
import { color } from "../../../styles/styles";
import { Props } from './';

export const ToggleWrapper = styled.div`
width: 40px;
height: 20px;
border-radius: 15px;
padding:3px;
background-color: ${color.light};
position:relative;
cursor: pointer;
border: solid 1px ${color.border};
${(props:Props) => props.active && css`
    background-color:${color.primary};
`}
`

interface ISlider {
    active?: boolean,
}

export const Slider = styled.div<ISlider>`
width: 20px;
height: 20px;
background-color: #fff;
position:absolute;
box-sizing:border-box;
box-shadow: 0 0 5px rgba(0,0,0,.25);
border: solid 1px ${color.border};
border-radius: 15px;
transition: all 0.1s ease;  
left: 3px;
    &.active{ 
    }
${(props:ISlider) => props.active && css`
    left: 23px;
`}
`

interface IToggleLabel {
    children: string,
}

export const ToggleLabel = styled.span<IToggleLabel>`
        color: ${color.mediumdark};
    font-size: 10px;
    box-sizing: border-box;
    &:first-of-type{
        color: #fff;
        padding-left: 5px;
        padding-right: 4px;
    }
    ${(props:IToggleLabel) => props.children === 'Off' && css`
        color: ${color.mediumdark};
    `}
`