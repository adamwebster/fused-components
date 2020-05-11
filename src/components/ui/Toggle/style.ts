import styled, { css } from 'styled-components';
import { color } from '../../../styles/styles';

interface TW {
  active: boolean;
  theme?: string;
  disabled?: boolean;
}
export const ToggleWrapper = styled.div<TW>`
  width: 40px;
  height: 20px;
  border-radius: 15px;
  padding: 3px;
  background-color: ${(props): string =>
    props.theme === 'dark'
      ? props.active
        ? props.disabled
          ? color.darkModeMediumDark
          : color.darkModeMediumLight
        : color.darkModeMediumDark
      : props.active
      ? props.disabled
        ? color.light
        : '#1867c9'
      : color.light};
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: solid 1px ${color.border};
`;

interface SliderInterface {
  active?: boolean;
  disabled?: boolean;
}

export const Slider = styled.div<SliderInterface>`
  width: 20px;
  height: 20px;
  background-color: ${(props): string =>
    props.theme === 'dark'
      ? props.disabled
        ? color.darkModeMediumDark
        : color.darkModeLighter
      : props.disabled
      ? color.light
      : '#fff'};
  position: absolute;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border: solid 1px ${color.border};
  border-radius: 15px;
  transition: all 0.1s ease;
  left: ${(props): string => (props.active ? '23px' : '3px')};
`;

interface TLProps {
  children: string;
  active: boolean;
  disabled?: boolean;
}

export const ToggleLabel = styled.span<TLProps>`
  font-size: 10px;
  box-sizing: border-box;
  display: inline-block;
  padding: 3px;
  float: ${({ active }) => (active ? 'left' : 'right')};
  ${({ disabled, children, theme }) =>
    disabled
      ? css`
          color: ${theme === 'dark' ? color.darkModeMediumLight : color.medium};
        `
      : css`
          color: ${children === 'Off' ? (theme === 'dark' ? '#fff' : color.darkest) : '#fff'};
        `}
`;
