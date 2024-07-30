/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path, { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer'; // Parses CSS
import 'dotenv/config';
import { fileURLToPath } from 'url';
import sass from 'sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env) => {
  const isDev = process.env.NODE_ENV.includes('dev');

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',
    watch: isDev,
    stats: {
      excludeModules: /node_modules/,
    },
    entry: path.resolve(__dirname, './client/src/index.tsx'),
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
            // {
            //   loader: 'babel-loader',
            //   options: {
            //     presets: ['@babel/preset-react', '@babel/preset-env'],
            //   },
            // },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
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
    ],
  };
};
