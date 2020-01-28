import styled, { css } from 'styled-components';
import variables from '../../../styles/variables';

export const StyledInput = styled.input`
width: 100%;
height:34px;
margin-bottom: 15px;
box-sizing:border-box;
padding: 0 10px;
outline: none;
border: solid 1px ${props => props.theme.borderColor};
border-radius: ${props => variables.borderRadius};
&::placeholder{
  font-style:italic; 
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