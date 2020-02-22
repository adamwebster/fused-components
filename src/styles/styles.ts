import { lighten } from 'polished';

export const color = {
  primary: "#4799ff",
  focus: "#4799ff",
  secondary: "#ff6347",
  tertiary: "#DDDDDD",
  danger: "#dd2c2e",
  warning: "#ffe3c7",
  info: "#bcd7ff",
  success: "#c0dcb1",
  red: "#dd2c2e",
  yellow: "#eba300",
  blue: "#1c91dc",
  green: "#79ca4c",
  highlight: lighten(0.3, '#4799ff'),
  // Monochrome
  lightest: "#FFFFFF",
  lighter: "#F8F8F8",
  light: "#F3F3F3",
  mediumlight: "#EEEEEE",
  medium: "#DDDDDD",
  mediumdark: "#999999",
  dark: "#666666",
  darker: "#444444",
  darkest: "#333333",
  overlay: "rgba(0,0,0,.5)",

  border: "rgba(0,0,0,.1)"
};