import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

interface ICheckboxInput extends React.HTMLProps<HTMLInputElement>{
  icon?: string,
  inError?: boolean,
  inWarning?: boolean,
}
export const StyledInput = styled.input<ICheckboxInput>`
width: 100%;
height:34px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${color.border};
border-radius: ${props => '5px'};
-webkit-appearance: none;
background-color: ${props => props.theme === 'dark' ? color.darkModeBG : '#fff'};
color: ${props => props.theme === 'dark' ? color.lighter : 'inherit'};

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

interface IIconWrapper {
  inError: boolean,
  inWarning: boolean,

}

export const IconWrapper = styled.span<IIconWrapper>`
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
