
/* Webpack Develop Server
 *
 * React Hot Loader will keep it mounted, preserving the state.
 * https://github.com/gaearon/react-hot-loader
 * https://github.com/gaearon/react-hot-boilerplate
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var host = '0.0.0.0';
var port = 3000;

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + [host, port].join(':'),
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      }
    ]
  }
};

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + [host, port].join(':'));
});
