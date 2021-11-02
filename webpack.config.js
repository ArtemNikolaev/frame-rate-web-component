const path = require('path');

module.exports = {
  target: "web",
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'frame-rate.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/source',
      },
      {
        test: /\.css$/i,
        type: 'asset/source',
      },
    ]
  }
};
