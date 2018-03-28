const webpack = require('webpack');
const path = require('path');

const config = [
  {
    // render
    entry: './src/main/main.js',
    output: {
      path: path.resolve(__dirname, 'dist/main'),
      filename: 'main.js'
    },
    // devServer:{
    //   contentBase: './dist',
    //   port:8081,
    //   inline:true
    // },
    devtool: 'source-map',
    target: 'electron-main',
    module: {
      rules:[
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: ['style-loader', 'css-loader']
      }
      ]
    }
  },
  {
    // renderer
    entry: './src/renderer/renderer.js',
    output: {
      path: path.resolve(__dirname, 'dist/renderer'),
      filename: 'renderer.js'
    },
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules:[
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: ['style-loader', 'css-loader']
      }
      ]
    }
  }
]


module.exports = config;