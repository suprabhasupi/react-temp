require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin');
const WebpackDotEnv = require('dotenv-webpack');
const ENV = process.env.ENV;
const webpackConfig = (env) => {
  let config = {
    entry: {
      client: './src/index.js',
      vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    plugins: [
      new WebpackDotEnv(),
      new WebpackDashboard(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        __DEV__: ENV === 'development' ? true : false,
        __LOCAL__: JSON.stringify(process.env.ENV),
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '/public/index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
    ],
    node: {
      fs: "empty"
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: false } }],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules(?!\/react-calendar)/],
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }]
    },

  }
  // if (ENV == 'development') {
  //   config.devServer = {
  //     port: 4500,
  //     inline: true,
  //     hot: true,
  //     historyApiFallback: true
  //   }
  // }
  return { ...config }
}


module.exports = webpackConfig;
