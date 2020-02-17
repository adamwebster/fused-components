import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const DropdownButtonWrapper = styled.div`
    position: relative;
`
export const DropdownMenuStyled = styled.ul`
    position:absolute;
    top: 34px;
    background-color: #fff;
    border: solid 1px ${color.border};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    min-width: 200px;
    margin: 0;
    padding:0;
    list-style:none;
    z-index: 99;
    margin-top: 5px;
    border-radius: 5px;
    animation:  ${props => props.menuOpen ? 'fadein 0.5s ease-in-out' : 'fadeout 0.2s ease-in-out' };
    @keyframes fadein {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    @keyframes fadeout {
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }

`

export const MenuItemStyled = styled.li`
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
export const IconStyled = styled.span`
    width: 16px;
    display:block;
    float: right;
    margin-top: 3px;
    height: 5px;
    margin-left: 5px;
`

export const MenuDivider = styled.hr`
    border-width: 0 0 1px 0;
    margin: 0;
    border-color: ${color.border}
`