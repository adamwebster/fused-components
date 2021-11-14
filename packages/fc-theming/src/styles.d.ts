// import original module declaration
import 'styled-components';

// and extend it

interface ColorIntervals {
    100?: string;
    200?: string;
    300?: string;
    800?: string;
    900?: string;
    700?: string;
}
interface CardStyles {
    backgroundColor?: string;
    boxShadow?:string;
}

interface Colors {
    white: string;
    grey: ColorIntervals;
}

interface ButtonStyles {
    backgroundColor?: string;
    borderColor?: string;
    hoverBackgroundColor?: string;
    textColor?: string;
    hoverTextColor?: string;
    activeBackgroundColor?: string;
}

interface ButtonTypes {
    primary: ButtonStyles;
    secondary: ButtonStyles;
    tertiary: ButtonStyles;
    ghost: ButtonStyles;
}

declare module 'styled-components' {
  export interface DefaultTheme {
      colors: Colors;
      card?: CardStyles;
      buttons?: ButtonTypes;
  }
}