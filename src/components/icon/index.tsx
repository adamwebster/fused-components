import React from "react";
import { icons } from "./icons";

export interface IconProps {
  icon?: string;
  color?: string;
}
export const Icon = ({ icon, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 48 48"
    >
      <path fill={color || "currentColor"} d={icon && icons[icon]}></path>
    </svg>
  );
};
