import { configure, addDecorator } from "@storybook/react"
import themeDecorator from "./themeDecorator"
import { withA11y } from '@storybook/addon-a11y';

addDecorator(themeDecorator);
addDecorator(withA11y);

// automatically import all files ending in *.stories.js|mdx
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);