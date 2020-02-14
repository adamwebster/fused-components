import React from 'react';
import { icons } from './icons';

const Icon = ({icon}) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 48 48"
  >
    <path
      fill="currentColor"
      d={icons[icon]}
    ></path>
  </svg>
  )
}

export default Icon;