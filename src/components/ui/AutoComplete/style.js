import styled from "styled-components";
import { color } from '../../../styles/styles';

export const AutoCompleteWrapper = styled.div`
  position: relative;
`;

export const AutoCompleteMenu = styled.ul`
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

export const MenuItemStyled = styled.li`
    width: 100%;
    padding: 10px;
    box-sizing:border-box;
    color: ${color.dark};
    &:last-child{
    }
    &:hover{
        background-color: ${color.light};
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


