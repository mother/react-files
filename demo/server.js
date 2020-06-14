const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../config/webpack.dev.config')

const compiler = webpack(webpackConfig)
const app = express()
const upload = multer({ dest: path.join(__dirname, '.uploads') })

app.use(webpackDevMiddleware(compiler, {
   publicPath: webpackConfig.output.publicPath,
   noInfo: true,
   quiet: false,
   historyApiFallback: true,
   stats: {
      colors: true
   }
}))

app.use(webpackHotMiddleware(compiler, {
   log: console.log,
   path: '/__webpack_hmr',
   heartbeat: 10 * 1000
}))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', function (req, res, next) {
   res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/files', upload.any(), function (req, res, next) {
   if (!req.files) {
      return next(new Error('No files uploaded'))
   }

   req.files.forEach((file) => {
      console.log(file)
      fs.unlinkSync(file.path)
   })

   res.status(200).end()
})

app.listen(process.env.PORT || 8080, function () {
   console.log(`Starting react-files demo on port 8080`)
})
