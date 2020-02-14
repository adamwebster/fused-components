import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

export const StyledDialog = styled.div`
 border-radius: ${props =>
    props.borderRadius ? props.borderRadius : '5px'};
  background-color: ${color.lightest};
  border: solid 1px ${color.border};
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`

export const DialogTitle = styled.div`
  border-bottom: solid 1px ${color.border};
  padding:10px;
  box-sizing:border-box;
`

export const DialogContent = styled.div`
  padding: 10px;
  box-sizing:border-box;
`

export const DialogFooter = styled.div`
  border-top: solid 1px ${color.border};
  padding:10px;
  box-sizing:border-box;
  text-align: right;
  button{
    display: inline-block;
    &:last-child{
      margin-left: 10px;
    }
  }
`

export const CloseButton = styled.button`
  right: 20px;
  top:20px;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight:bold;
  color: ${color.mediumdark};
  position: absolute;
  cursor: pointer;
  &:hover{
    color: ${color.dark};
  }
  svg{
    width: 16px;
    &:hover{
    color: ${color.dark};
  }
  }
`
