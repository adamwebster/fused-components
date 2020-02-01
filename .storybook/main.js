module.exports = {
  // stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs/preset',
    '@storybook/addon-viewport/register',
    '@storybook/addon-a11y/register'
  ],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.js'],
};
