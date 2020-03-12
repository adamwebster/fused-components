const path = require("path");

const excludeProps = prop => {
  if (prop.parent) {
    return !prop.parent.fileName.includes("node_modules");
  }
  return true;
};
module.exports = {
  presets: [
    {
      name: "storybook-addon-deps/preset",
      options: {
        exclude: /^@babel/
      }
    }
  ],
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "../tsconfig.json")
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, "../src")],
        transpileManager: true
      }
    },
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    "@storybook/addon-docs/preset",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register",
    "storybook-addon-deps"
  ],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.js"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
