const { merge } = require('webpack-merge')
const common = require('./webpack.base.config.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
        runtimeErrors: true,
      },
    },
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:8081',
        logLevel: 'debug' /*optional*/
      }
    }
  },
});
