const path = require('path')

module.exports = {
   mode: 'production',
   entry: {
      main: './src/index.js'
   },
   output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd',
      // Workaround until https://github.com/webpack/webpack/issues/6525 is adddressed
      globalObject: 'this'
   },
   externals: {
      react: {
         commonjs: 'react',
         commonjs2: 'react',
         amd: 'React',
         root: 'React'
      },
      'react-dom': {
         commonjs: 'react-dom',
         commonjs2: 'react-dom',
         amd: 'ReactDOM',
         root: 'ReactDOM'
      }
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         }
      ]
   }
}
