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
  border:solid 1px #c34242;
`}
&::before{
  content:'test'
}
`