// themeDecorator.js
import React from "react"
import { MainTheme } from "@adamwebster/fc-theming"
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
  }

  `
const ThemeDecorator = storyFn => (
  <ThemeProvider theme={MainTheme}>
    <GlobalStyle />
    {storyFn()}</ThemeProvider>
)

export default ThemeDecorator