const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./build/webpack.dev');

new WebpackDevServer(
  webpack(config),
  {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }
).listen(
  3000,
  '0.0.0.0',
  (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log('Listening at localhost:3000');
  }
);
