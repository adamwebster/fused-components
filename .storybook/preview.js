import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { DocsPage } from "storybook-addon-deps/blocks";
import { withA11y } from "@storybook/addon-a11y";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FCThemeProvider } from "../src/theming/FCTheme";
library.add(fab, fas, far);

addParameters({
  options: {
    showRoots: true
  },
  docs: { page: DocsPage },
  dependencies: { withStoriesOnly: true, hideEmpty: false }
});

addDecorator(withA11y);

addDecorator(story => (
  <>
   {story()}
  </>
));
