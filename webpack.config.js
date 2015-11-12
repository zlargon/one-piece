module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'autoprefixer', 'less']
      }
    ]
  }
};
