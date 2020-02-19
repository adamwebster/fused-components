const path = require("path");

module.exports = {
  addons: [
    {
    name: '@storybook/preset-create-react-app',
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      }
    }
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs/preset',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register',
    'storybook-addon-deps'
  ],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js'],
};
