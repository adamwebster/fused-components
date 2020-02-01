import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
  }
  `

addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
));

