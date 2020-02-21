import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { DocsPage } from 'storybook-addon-deps/blocks';
import { withA11y } from '@storybook/addon-a11y';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas, far);

addParameters({
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: false, hideEmpty: true }
});

addDecorator(withA11y)

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

