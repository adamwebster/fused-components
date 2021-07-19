const path = require('path');

const excludeProps = prop => {
  if (prop.parent) {
    return !prop.parent.fileName.includes('node_modules');
  }
  return true;
};
// .storybook/main.js

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
};
