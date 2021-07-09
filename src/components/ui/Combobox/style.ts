import styled from 'styled-components';
import { color } from '../../../styles/styles';
import { Input } from '../Input';
import { ReactNode } from 'react';

export const ComboboxWrapper = styled.div`
  position: relative;
`;

export const InputStyled = styled(Input)`
  padding-right: 35px;
`;

interface MIS extends React.HTMLAttributes<HTMLLIElement> {
  ref?: ReactNode;
}

export const MenuItemStyled = styled.li<MIS>`
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
export const ItemIcon = styled.span`
  width: 16px;
  display: inline-block;
  svg {
    color: ${(props): string => (props.theme === 'dark' ? color.darkModeMediumLight : color.mediumdark)};
    margin-right: 5px;
  }
`;

export const CaretIcon = styled.div`
  width: 18px;
  position: absolute;
  right: 10px;
  top: 15px;
  svg {
    color: ${color.mediumdark};
    margin-right: 5px;
  }
`;
