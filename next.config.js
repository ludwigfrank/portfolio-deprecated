module.exports = {
  webpack: function (config, { dev }) {

    config.resolve.alias = {
        '~': './'
    },

    config.module.rules.push(
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff&outputPath=static/',
        },
    )

    return config
  }
}
