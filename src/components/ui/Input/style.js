import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

export const StyledInput = styled.input`
width: 100%;
height:34px;
margin-bottom: 15px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${color.border};
border-radius: ${props => '5px'};
-webkit-appearance: none;
&::placeholder{
  font-style:italic; 
}

&:focus{
  border-color: ${color.focus};
  box-shadow: 0 0 6px ${color.focus};
}
&[disabled]{
  cursor: not-allowed;
  background-color: #e9e9e9;
}
${props => props.inError && css`
  border:solid 1px ${color.red};
  &:focus{
  border-color: ${color.red};
  box-shadow: 0 0 6px ${color.red};
}
`}

${props => props.inWarning && css`
  border:solid 1px ${color.yellow};
  &:focus{
  border-color: ${color.yellow};
  box-shadow: 0 0 6px ${color.yellow};
}
`}

${props => props.icon && css`
  padding-left: 35px;
`}
`

export const InputWrapper = styled.div`
  position:relative;

`

export const Icon = styled.span`
position: absolute;
left: 10px;
top: 7px;
color: ${color.mediumdark};
border-right: solid 1px ${color.border};
box-sizing:border-box;

svg{
  top: 2px;
  position:relative;
  margin-right: 5px;
  width:12px;

}
${props => props.inError && css`
  color: ${color.red};
  border-color: ${color.red};
`}
${props => props.inWarning && css`
  color: ${color.yellow};
  border-color: ${color.yellow};
`}
`