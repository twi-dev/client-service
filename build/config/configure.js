const readdirSync = require("fs").readdirSync
const join = require("path").join

const ROOT = join(__dirname, "..", "..")

function readLoaders(env) {
  const LOADERS_ROOT = join(__dirname, "..", "loader")
  const list = readdirSync(LOADERS_ROOT)

  const loaders = []

  for (const name of list) {
    const initializer = require(join(LOADERS_ROOT, name))

    loaders.push(initializer(env))
  }

  return loaders
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
    filename: "js/[name]-[hash].js"
  }
})

module.exports = configure
