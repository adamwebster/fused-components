import { configure, addDecorator } from "@storybook/react"
import themeDecorator from "./themeDecorator"

addDecorator(themeDecorator);

// automatically import all files ending in *.stories.js|mdx
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);