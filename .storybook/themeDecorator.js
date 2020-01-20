// themeDecorator.js
import React from "react"
import theme from "../src/themes"
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas, far);

const GlobalStyle = createGlobalStyle`
  body {
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
  }
  .sidebar-header{
    background-color: "black";
      width:30px;
  
  }
  `
const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme.default}>
    <GlobalStyle />
    {storyFn()}</ThemeProvider>
)

export default ThemeDecorator