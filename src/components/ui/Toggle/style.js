import styled, { css } from 'styled-components';
import { color } from "../../../styles/styles";

export const ToggleWrapper = styled.div`
width: 40px;
height: 20px;
border-radius: 15px;
background-color: ${color.light};
position:relative;
cursor: pointer;
border: solid 1px ${color.border};
${props => props.active && css`
    background-color:${color.green};
`}
`

export const Slider = styled.div`
width: 20px;
height: 100%;
background-color: #fff;
position:absolute;
box-sizing:border-box;
box-shadow: 0 0 5px rgba(0,0,0,.25);
border: solid 1px ${color.border};
border-radius: 15px;
transition: all 0.1s ease;  
left: 0;
    &.active{ 
    }
${props => props.active && css`
    left: 20px;
`}
`

export const ToggleLabel = styled.span`
    color:#fff;
    font-size: 10px;
    box-sizing: border-box;
    &:first-of-type{
        padding-left: 5px;
        padding-right: 4px;
    }
    ${props => props.children === 'Off' && css`
        color: ${color.mediumdark};
    `}
`