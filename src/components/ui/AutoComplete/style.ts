import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const AutocompleteWrapper = styled.div`
  position: relative;
`;

export const AutocompleteMenu = styled.ul`
  position: absolute;
  top: 34px;
  background-color: ${props => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  border: solid 1px ${props => (props.theme === 'dark' ? color.darkModeMedium : color.border)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  z-index: 99;
  margin-top: 5px;
  border-radius: 5px;
  overflow: hidden;
`;

export const MenuItemStyled = styled.li`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: ${props => (props.theme === 'dark' ? color.medium : color.dark)};
  &:last-child {
  }
  &:hover,
  &:focus {
    background-color: ${props => (props.theme === 'dark' ? color.darkModeMedium : color.highlight)};
    color: ${props => (props.theme === 'dark' ? color.light : 'inherit')};

    outline: none;
  }
  svg {
    width: 12px;
    top: 5px;
    margin-right: 5px;
  }
`;

export const NoItemFound = styled.li`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  color: ${props => (props.theme === 'dark' ? color.medium : color.dark)};
`;
export const ItemIcon = styled.span`
  width: 16px;
  display: inline-block;
  svg {
    color: ${props => (props.theme === 'dark' ? color.darkModeMediumLight : color.mediumdark)};
    margin-right: 5px;
  }
`;
