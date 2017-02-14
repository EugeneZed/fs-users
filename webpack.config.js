var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  context: path.join(__dirname, 'src/client/js'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'src/client/www'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
      }
    ],
  },
  sassLoader: {
    includePaths: [
    './node_modules'
  ]
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ]
  },
  plugins: [
       new ExtractTextPlugin("style.css"),
   ],
  devtool: 'source-map'

};
module.exports = config;
