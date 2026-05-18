import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    // "@storybook/preset-scss",
    // "storybook-css-modules",

    // "@storybook/addon-styling-webpack",
  ],
  framework: "@storybook/react-webpack5",
  core: {
    builder: {
      name: "@storybook/builder-webpack5",
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config) => {
    config.resolve!.alias = {
      "@store": path.resolve(__dirname, "../src/store"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
    };

    config?.module?.rules?.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true, // Enable CSS Modules
          },
        },
        "sass-loader",
      ],
    });

    return config;
  },
};
export default config;
