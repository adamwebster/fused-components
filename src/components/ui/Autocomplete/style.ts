import styled from 'styled-components';
import { color } from '../../../styles/styles';

export const AutocompleteWrapper = styled.div`
  position: relative;
`;

export const MenuItemStyled = styled.li`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.dark)};
  &:last-child {
  }
  &:hover,
  &[aria-selected='true'] {
    background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.highlight)};
    color: ${(props): string => (props.theme === 'dark' ? color.light : 'inherit')};

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
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.dark)};
`;
export const ItemIcon = styled.span`
  width: 16px;
  display: inline-block;
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeMediumLight : color.mediumdark)};
  margin-right: 5px;
`;
