import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';
import { darken, lighten } from 'polished';

interface IInput extends React.HTMLProps<HTMLInputElement>{
  icon?: string,
  inError?: boolean,
  inWarning?: boolean,
  theme: string,
}
export const StyledInput = styled.input<IInput>`
width: 100%;
height:34px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${props => props.theme === 'dark' ? darken(0.3, color.focus) : color.border};
border-radius: ${props => '5px'};
-webkit-appearance: none;
background-color: ${props => props.theme === 'dark' ? color.darkModeBG : '#fff'};
color: ${props => props.theme === 'dark' ? color.medium : 'inherit'};

&::placeholder{
  font-style:italic; 
  color: ${props => props.theme === 'dark' ? lighten(0.2, color.darkModeBG) : 'inherit'};
}

&:focus{
  border-color:${props => props.theme === 'dark' ? darken(0.2, color.focus) : color.focus};
  box-shadow: 0 0 6px ${props => props.theme === 'dark' ? darken(0.1, color.focus) : color.focus};
}
&[disabled]{
  cursor: not-allowed;
  background-color: ${props => props.theme === 'dark' ? darken(0.1, color.darkModeBG) : '#e9e9e9'};

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
  theme: string,

}

export const IconWrapper = styled.span<IIconWrapper>`
position: absolute;
left: 10px;
top: 7px;
color: ${props => props.theme === 'dark' ? lighten(0.2, color.darkModeBG) : color.mediumdark};
border-right: solid 1px ${props => props.theme === 'dark' ? lighten(0.2, color.darkModeBG) : color.border};
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
