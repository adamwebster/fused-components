// themeDecorator.js
import React from "react"
import theme from "../src/themes"
import { ThemeProvider } from "styled-components";

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme.default}>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator