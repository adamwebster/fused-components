import styled, { css } from 'styled-components';
import variables from '../../../styles/variables';

export const ToggleWrapper = styled.div`
width: 36px;
height: 20px;
border-radius: 15px;
background-color: #c34242;
position:relative;
cursor: pointer;

${props => props.active && css`
    background-color:${variables.green};
`}
`

export const Slider = styled.div`
width: 20px;
height: 100%;
background-color: #fff;
position:absolute;
box-sizing:border-box;
box-shadow: 0 0 5px rgba(0,0,0,.25);
border: solid 1px ${variables.borderColor};
border-radius: 15px;
transition: all 0.1s ease;  
left: 0;
    &.active{ 
    }
${props => props.active && css`
    left: 18px;
`}
`
