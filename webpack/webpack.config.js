const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const IfPlugin = require('if-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const cssNano = require('cssnano');

/**
 * Project config
 */

const config = require('../config');

const src = `${config.root}/src`;
const outputDir = `${config.root}/${config.build.outputDir}`;

const APP_ENV = process.env.NODE_ENV;

const isProduction = APP_ENV === 'production';
const isDevelopment = APP_ENV === 'development';
const isHotReload = process.env.HOT_DEV;

config.build.publicPath = isHotReload ? '/' : config.build.publicPath;
const { publicPath } = config.build;

const sourceMap = isDevelopment;

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    port: config.devServer.port,
    overlay: true,
    disableHostCheck: true,
  },
  devtool: isProduction ? 'eval' : 'inline-source-map',
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity,
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
      new IfPlugin(
        config.build.optimizeImages,
        new ImageminPlugin({
          test: /\.(gif|png|jpe?g)$/,
        }),
      ),
    ],
  },
  context: src,
  entry: {
    main: `${src}/index.js`,
  },
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js',
    path: outputDir,
    publicPath
  },
  resolve: {
    alias: {
      '@': src,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: [
          "raw-loader",
          "pug-html-loader"
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/, 
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../',
              sourceMap,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [cssNano({
                preset: 'default',
              }), autoprefixer],
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'import-glob-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'assets/images/[name].[ext]',
          }
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'assets/fonts/[name].[ext]',
          }
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      'process.env.NODE_ENV': JSON.stringify(APP_ENV),
    }),
    new HtmlWebpackPugPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      Promise: 'es6-promise/dist/es6-promise.auto.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${config.root}/public`,
          to: '.',
          toType: 'dir',
        },
        {
          from: `${src}/assets`,
          to: 'assets',
          toType: 'dir',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/style.css',
      chunkFilename: 'assets/styles/_chunk-[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'views/pages/index.pug',
      filename: 'index.html',
    }),
  ],
}