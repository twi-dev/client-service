const {prepareUrls} = require("react-dev-utils/WebpackDevServerUtils")
const openBrowser = require("react-dev-utils/openBrowser")

const DevServer = require("webpack-dev-server")
const webpack = require("webpack")

const createCompiler = (config, {dev}) => new Promise((resolve, reject) => {
  const fulfill = (err, stats) => err ? reject(err) : resolve(stats)

  const {devServer, ...rest} = config

  const compiler = webpack(rest)

  if (!dev) {
    return compiler.run(fulfill)
  }

  const server = new DevServer(compiler, {
    ...devServer, publicPath: rest.output.publicPath
  })

  server.listen(devServer.port, "localhost", err => {
    if (err) {
      return fulfill(err)
    }

    const {localUrlForBrowser} = prepareUrls(
      "http", "localhost", devServer.port
    )

    openBrowser(localUrlForBrowser)
  });

  ["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, () => {
    server.close()
    process.exit(0)
  }))
})

module.exports = createCompiler
