const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_ROOT = path.resolve(__dirname, '../');

const webpackConfig = {
  watch: true,
  entry: [
    `${APP_ROOT}/src/js/yavascript.js`,
    `${APP_ROOT}/src/scss/estilos.scss`
  ],
  output: {
    filename: 'public/js/[name].bundle.js',
    path: APP_ROOT
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?importLoaders=1',
      }),
    }, {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].bundle.css",
      allChunks: true
    })
  ]
};

module.exports = webpackConfig;
