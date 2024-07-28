import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import autoprefixer from 'autoprefixer';
// import { load } from 'ts-dotenv';
// const dotenv = require('dotenv');
// require('dotenv').config();
// require('dotenv').config();
import dotenv from 'dotenv';



// eslint-disable-next-line no-undef
const { NODE_ENV } = process.env;
const isDev = NODE_ENV.includes('dev');

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'inline-source-map' : 'source-map',
  watch: isDev,
  stats: {
    excludeModules: /node_modules/,
  },
  entry: path.resolve(__dirname, './client/src/index.ts'),
  output: {
    path: path.resolve(__dirname, './client/dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            // Added to suppress webpack sass deprecation warnings
            // Remove if we need to fix them later
            options: {
              /* eslint-disable global-require */
              // eslint-disable-next-line no-undef
              implementation: require('sass'),
              /* eslint-enable global-require */
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
    }),
    new NodePolyfillPlugin(),
  ],
};

module.exports = config;
