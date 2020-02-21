const path = require("path");

const excludeProps = (prop) => {
  if (prop.parent) {
    return !prop.parent.fileName.includes('node_modules')
  }
  return true
}
module.exports = {
  presets: [{
    name: 'storybook-addon-deps/preset',
    options: {
      exclude:  /^@babel/
    }
  }],
  addons: [
    {
    name: '@storybook/preset-create-react-app',
    options: {
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
        propFilter: props => excludeProps(props),
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
