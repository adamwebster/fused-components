import styled from "styled-components";
import { color } from '../../../styles/styles';
import { darken } from "polished";
import { cpus } from "os";

export const AutocompleteWrapper = styled.div`
  position: relative;
`;

export const AutocompleteMenu = styled.ul`
  position: absolute;
  top: 34px;
  background-color: ${props => props.theme === 'dark' ? color.darkModeBG : '#fff'};
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
    color: ${props => props.theme === 'dark' ? color.medium : color.dark};
    &:last-child{
    }
    &:hover,
    &:focus{
      background-color: ${props => props.theme === 'dark' ? darken(0.2, color.highlight) : color.highlight};
      color: ${props => props.theme === 'dark' ? color.light : 'inherit'};

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


