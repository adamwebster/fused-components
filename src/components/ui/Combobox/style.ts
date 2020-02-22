import styled from "styled-components";
import { color } from '../../../styles/styles';
import { Input } from "../Input";

export const ComboboxWrapper = styled.div`
  position: relative;
`;

export const InputStyled = styled(Input)`
  padding-right: 35px;
`

interface IComboboxMenu extends React.HTMLProps<HTMLElement>{
  ref: any
}

export const ComboboxMenu = styled.ul<IComboboxMenu>`
  position: absolute;
  top: 34px;
  background-color: #fff;
  border: solid 1px ${color.border};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  z-index: 99;
  margin-top: 5px;
  border-radius: 5px;
`;

interface IMenuItemStyled extends React.HTMLProps<HTMLElement>{
  ref?: any
}

export const MenuItemStyled = styled.li<IMenuItemStyled>`
    width: 100%;
    padding: 10px;
    box-sizing:border-box;
    color: ${color.dark};
    &:last-child{
    }
    &:hover,
    &:focus{
        background-color: ${color.highlight};
        outline:none;
    }
    svg{
        width: 12px;
        top: 5px;
        margin-right: 5px;
    }
`
export const ItemIcon = styled.span`
width: 16px;
display: inline-block;
 svg{
     color: ${color.mediumdark};
     margin-right: 5px;
 }
`

export const CaretIcon = styled.div`
  width:18px;
  position: absolute;
  right: 10px;
  top: 15px;
  svg{
     color: ${color.mediumdark};
     margin-right: 5px;
 }
`
