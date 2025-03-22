import path from 'node:path';

import UnoCss from '@unocss/webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const environment = process.env.NODE_ENV ?? 'development';

/** @type {import('webpack').Configuration} */
const config = {
  devtool: 'cheap-source-map',
  entry: {
    main: './src/main.tsx'
  },
  mode: environment,
  module: {
    rules: [
      {
        exclude: [/node_modules\/video\.js/, /node_modules\/@videojs/],
        resolve: {
          fullySpecified: false,
        },
        test: /\.(?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: '3.41',
                  forceAllTransforms: false,
                  targets: 'defaults',
                  useBuiltIns: 'entry',
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
              ['@babel/preset-typescript'],
            ],
          },
        },
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        resourceQuery: /arraybuffer/,
        type: 'javascript/auto',
        use: {
          loader: 'arraybuffer-loader',
        },
      },
      // CSSファイル向けに特別なローダー設定
      {
        oneOf: [
          // ?rawクエリ付きの場合
          {
            resourceQuery: /raw/,
            type: 'asset/source',
          },
          // 通常のCSSファイル
          {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { url: false }
              }
            ]
          }
        ],
        test: /\.css$/,
      },
    ],
  },
  output: {
    chunkFilename: 'chunk-[contenthash].js',
    chunkFormat: false,
    filename: '[name].js',
    path: path.resolve(import.meta.dirname, './dist'),
    publicPath: 'auto',
  },
  plugins: [
    new webpack.EnvironmentPlugin({ API_BASE_URL: '/api', NODE_ENV: environment }),
    UnoCss(),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.tsx', '.jsx'],
  },
};

export default config;
