import React, { useContext, ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import { FCTheme } from '../../../theming/FCTheme';
import { color } from '../../../styles/styles';

interface GSProps {
  backgroundColor?: string;
}

const GlobalStyles = createGlobalStyle<GSProps>`
    body {
      margin: 0;
      padding: 0;
      font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
      background-color: ${props => (props.theme === 'dark' ? color.darkModeDarkest : props.backgroundColor)};
      color: ${props => (props.theme === 'dark' ? color.medium : color.dark)};
    }
`;

interface Props {
  backgroundColor?: string;
}
const FCGlobalStyles = ({ backgroundColor }: Props): ReactElement => {
  const theme = useContext(FCTheme);

  return <GlobalStyles backgroundColor={backgroundColor} theme={theme.theme} />;
};

export default FCGlobalStyles;
