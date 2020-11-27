const path = require('path');

const excludeProps = prop => {
  if (prop.parent) {
    return !prop.parent.fileName.includes('node_modules');
  }
  return true;
};
module.exports = {
  addons: ['@storybook/addon-essentials', 'storybook-addon-deps', '@storybook/addon-a11y/'],
  stories: ['../src/**/*.stories.@(ts|js|mdx|jsx|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
