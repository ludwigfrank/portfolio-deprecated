const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = {
  webpack: function (config, { dev }) {
    // For the development version, we'll use React.
    // Because, it support react hot loading and so on.
    if (dev) {
      return config
    }

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.resolve.alias = {
        '~': './'
    },

    config.rules.push(
        {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
		    loader: 'file-loader'
        }
    )

    return config
  }
}
