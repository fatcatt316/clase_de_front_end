const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.config.js');
// const rp = require('request-promise');
// const bodyParser = require('body-parser'); // for reading JSON in requests.

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
// app.use(bodyParser.json());

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
  app.get('/', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '/../dist')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// app.get('/google-results', function(req, res) {
//   let googleUrl;
//   console.log("Shucks");

//   const {query: {city, name}} = req;
//   console.log("CITY: ", city);
//   console.log("NAME: ", name);

  // if (req.query.name) {
  //   googleUrl = 'https://www.google.com/search?q="' + encodeURI('"'+ req.query.name + '"');
  //   if (req.query.city) {
  //     googleUrl = googleUrl + '+' + encodeURI(req.query.city);
  //   }
  // } else {
    return 'NO RESULTS';
  // }

//   var options = {
//     method: 'GET',
//     uri: googleUrl
//   };
//   // Hit API using request-promise library
//   rp(options)
//     .then(function(resp) {
//       console.log("HERE WE GO");
//       console.log(resp);
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
