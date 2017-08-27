var express = require('express')
var fs = require('fs')
var multer = require('multer')
var path = require('path')

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev.config')
var compiler = webpack(config)

var app = express()
var upload = multer({ dest: './.uploads/' })

app.use(webpackDevMiddleware(compiler, {
   publicPath: config.output.publicPath,
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

app.use('/assets', express.static('assets'))

app.get('/', function (req, res, next) {
   res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/files', upload.any(), function (req, res, next) {
   if (!req.files) {
      return next(new Error('No files uploaded'))
   }

   req.files.forEach((file) => {
      console.log(file)
      fs.unlinkSync(path.join(__dirname, file.path))
   })

   res.status(200).end()
})

app.listen(8080, function () {
   console.log(`Starting react-files demo on port 8080`)
})
