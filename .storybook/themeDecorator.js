// themeDecorator.js
import React from "react"
import theme from "../src/themes"
import { ThemeProvider, createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  body {
    font: 13px/1.5 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, sans-serif;
  }
  `
const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme.default}>
    <GlobalStyle />
    {storyFn()}</ThemeProvider>
)

export default ThemeDecorator