import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { type Configuration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
// In Node.js versions prior to native support for import.meta.dirname,
// derive __dirname from import.meta.url.
// (Node 20.11+ supports import.meta.dirname and import.meta.filename.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mode: Configuration["mode"] = "development";

if (process.env.NODE_ENV === "production") {
  mode = "production";
}

const devServer: DevServerConfiguration = {
  port: 9000,
  static: {
    directory: path.join(__dirname, "./public"),
    watch: true,
  },
  hot: true,
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        [
          "postcss-preset-env",
          {
            // Options
          },
        ],
      ],
    },
  },
};

const aliasConfig = {
  "@store": path.resolve(__dirname, "src/store/"),
  "@components": path.resolve(__dirname, "src/components/"),
  // "@styles": path.resolve(__dirname, "src/styles/"),
  "@*": path.resolve(__dirname, "src/*"),
};

const config: Configuration = {
  mode,
  entry: path.resolve(__dirname, "./src/index.tsx"),
  devtool: mode === "development" ? "inline-source-map" : false,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", postcssLoader],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentName:
                  mode === "development"
                    ? "[path][name]__[local]--[hash:base64:5]"
                    : "[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
                localIdentHashSalt: "my-custom-hash",
                namedExport: true,
                exportLocalsConvention: "as-is",
                exportOnlyLocals: false,
              },
            },
          },
          postcssLoader,
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: aliasConfig,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devServer,
};

export default config;

/**
+ 1) проект должен собираться с помощью webpack версии 5 
1.1) (также необходимо изучить, какие могут быть варианты target);
+ 2) в проекте должна быть возможность подключать стили, причем это могут быть простой css, css-модули, postcss (для него нужно подключить как минимум один плагин - autoprefixer), sass / SCSS
+ 3) весь код проекта должен прогоняться через babel (в нем должны быть подключены как минимум три пресета - для преобразования JS в более низкие стандарты, для работы с реактом и для транспиляции typescript)
+ 4) проект должен быть на typescript (транспиляцию ts должен делать babel, а tsc должен осуществлять проверку типов)
5) все зависимости должны находиться в логически подходящих им секциях - dependencies / devDependencies / peerDependencies
+ 6) в проекте должна быть настройка разных source-map - для разработки и для продакшена
7) для импортов в проекте должны быть настроены алиасы
+ 8) для разработки должен быть настроен  webpack dev-server
9) для продакшена должна быть настроена минификация кода (как по дефолту, так и Terser Plugin)
10) код-сплиттинг (разбиение чанков по размеру / выделение модулей в отдельные чанки с React lazy или loadable)
11) проект покрыт тестами (Jest)
12) к проекту подключен Storybook
 */
