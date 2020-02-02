import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { DocsPage } from 'storybook-addon-deps/blocks';

addParameters({
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: true, hideEmpty: true }
});

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

