const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/requirements', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/requirements.html'));
  });
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '/../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// app.post('/api/our_custom_endpoint', function(req, res) {
//   var url = `http://numbersapi.com/${req.body.number}`
//   var options = {
//     method: 'GET',
//     uri: url
//   };
//   // Hit API using request-promise library
//   rp(options)
//     .then(function(resp) {
//       res.send({
//         resp: resp
//       });
//     })
//     .catch(function(err) {
//       console.error(err);
//       res.send({
//         resp: err
//       });
//     });
// });

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  // eslint-disable-next-line no-console
  console.info(`Listenin' on port ${port}. Fire up http://localhost:${port}/ in Internet Explorer.`);
});
