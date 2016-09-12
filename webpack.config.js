var path = require('path')
// var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  plugins: [],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }],
    resolve: {
      // Can require('file') instead of require('file.js') etc.
      extensions: ['', '.js', '.json']
    }
  }
}
