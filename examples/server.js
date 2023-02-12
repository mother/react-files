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
   publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
   log: console.log, // eslint-disable-line no-console
   path: '/__webpack_hmr',
   heartbeat: 10 * 1000
}))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res, next) => {
   res.sendFile(path.join(`${__dirname}/index.html`))
})

app.post('/files', upload.any(), (req, res, next) => {
   if (!req.files) {
      return next(new Error('No files uploaded'))
   }

   req.files.forEach((file) => {
      console.log(file) // eslint-disable-line no-console
      fs.unlinkSync(file.path)
   })

   res.status(200).end()
})

const server = app.listen(process.env.PORT || 8080, () => {
   // eslint-disable-next-line no-console
   console.log(`Starting react-files examples on port ${server.address().port}`)
})
