import React, { ReactElement, HTMLAttributes } from 'react';
import { icons } from './icons';
import styled from 'styled-components';

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  icon?: string;
  color?: string;
  className?: string;
}

const SVGIcon = styled.svg`
  width: 1em;
  height: 1em;
`;
export const Icon = ({ icon, className, color, ...rest }: IconProps): ReactElement => {
  return (
    <SVGIcon
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      role="img"
      viewBox="0 0 48 48"
      className={`${className ? className : ''} ${icon}`}
      {...rest}
    >
      <path fill={color || 'currentColor'} d={icon && icons[icon]}></path>
    </SVGIcon>
  );
};
