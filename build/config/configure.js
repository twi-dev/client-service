const readdirSync = require("fs").readdirSync
const join = require("path").join

const ROOT = join(__dirname, "..", "..")

function mapDir(path, fn) {
  const dir = readdirSync(path)

  const res = []

  for (const file of dir) {
    const ref = fn(require(join(path, file)), file)

    if (ref != null) {
      res.push(ref)
    }
  }

  return res
}

function readLoaders(env) {
  const LOADERS_ROOT = join(__dirname, "..", "loader")

  const loaders = mapDir(LOADERS_ROOT, initializer => initializer(env))

  return loaders
}

function readPlugins(env) {
  const PLUGINS_ROOT = join(__dirname, "..", "plugin")

  const plugins = mapDir(PLUGINS_ROOT, initializer => initializer(env))

  return plugins
}

const configure = env => ({
  devtool: env.dev ? "eval-source-map" : false,
  performance: {
    hints: env.dev ? false : "error"
  },
  resolve: {
    extensions: [
      ".js", ".jsx", "json"
    ],
    modules: [
      "node_modules",
      join(ROOT, "src")
    ]
  },
  plugins: readPlugins(env),
  module: {
    rules: readLoaders(env)
  },
  devServer: {
    hot: true,
    compress: true
  },
  entry: {
    common: join(ROOT, "src", "core", "base", "main.js")
  },
  output: {
    path: join(ROOT, "static", "assets"),
    filename: "js/[name]-[hash].js",
    publicPath: "/assets/"
  }
})

module.exports = configure
