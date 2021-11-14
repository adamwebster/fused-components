import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#fff',
  grey: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    800: '#1F2937',
    900: '#111827',
    700: '#374151',
  },
};

export const MainTheme: DefaultTheme = {
  colors,
  card: {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  get buttons() {
    return {
      primary: {
        backgroundColor: this.colors.grey[900],
        borderColor: this.colors.grey[900],
        hoverBackgroundColor: this.colors.grey[700],
        textColor: this.colors.white,
        hoverTextColor: this.colors.white,
        hoverBorderColor: this.colors.grey[900],
        activeBackgroundColor: this.colors.grey[800],
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: this.colors.grey[900],
        hoverBackgroundColor: 'transparent',
        textColor: this.colors.grey[900],
        hoverTextColor: this.colors.grey[700],
        hoverBorderColor: this.colors.grey[700],
        activeBackgroundColor: this.colors.grey[100],
      },
      tertiary: {
        backgroundColor: this.colors.grey[200],
        borderColor: this.colors.grey[200],
        hoverBackgroundColor: this.colors.grey[100],
        textColor: this.colors.grey[900],
        hoverTextColor: this.colors.grey[700],
        hoverBorderColor: this.colors.grey[100],
        activeBackgroundColor: this.colors.grey[100],
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        hoverBackgroundColor: this.colors.grey[100],
        textColor: this.colors.grey[900],
        hoverTextColor: this.colors.grey[700],
        hoverBorderColor: this.colors.grey[100],
        activeBackgroundColor: this.colors.grey[100],
      },
    };
  },
};
