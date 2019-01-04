const {readdirSync} = require("fs")
const {join, extname} = require("path")

const Terser = require("terser-webpack-plugin")

const getConfig = require("../helper/getConfig")

const ROOT = join(__dirname, "..", "..")

function mapDir(path, fn) {
  const dir = readdirSync(path)

  const res = []

  for (const file of dir) {
    if (extname(file).slice(1) !== "js") {
      continue
    }

    const ref = fn(require(join(path, file)), file)

    if (ref) {
      res.push(ref)
    }
  }

  return res
}

function readLoaders(env) {
  const LOADERS_ROOT = join(__dirname, "loader")

  const loaders = mapDir(LOADERS_ROOT, initializer => initializer(env, {
    root: ROOT
  }))

  return loaders
}

function readPlugins(env) {
  const PLUGINS_ROOT = join(__dirname, "plugin")

  const plugins = mapDir(PLUGINS_ROOT, initializer => initializer(env, {
    root: ROOT
  }))

  return plugins
}

const configure = env => ({
  mode: env.dev ? "development" : "production",
  devtool: env.dev ? "eval-source-map" : false,
  performance: {
    hints: false
    // hints: env.dev ? false : "error",

    // ~320 KB, don't forget to enable gzip on your server
    // maxEntrypointSize: 320000,
    // maxAssetSize: 320000
  },
  optimization: {
    minimize: !env.dev,
    minimizer: [
      new Terser({
        test: /\.(m?js|jsx)$/,
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ],
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "."
    }
  },
  resolveLoader: {
    modules: [
      "node_modules",
      join(__dirname, "..", "loader")
    ]
  },
  resolve: {
    mainFields: ["main", "module"],
    extensions: [
      ".jsx", ".mjs", ".js", ".json"
    ],
    modules: [
      "node_modules",
      join(ROOT, "src")
    ],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: readPlugins(env),
  module: {
    rules: readLoaders(env)
  },
  devServer: {
    // open: env.dev,
    hot: true,
    compress: true,
    port: getConfig(env).client.port || 1339,
    contentBase: join(ROOT, "static"),
    historyApiFallback: true
  },
  context: join(ROOT, "src"),
  entry: {
    common: [
      join(ROOT, "src", "core", "base", "main.jsx")
    ]
  },
  output: {
    path: join(ROOT, "static", "assets"),
    filename: `js/${env.dev ? "[name]" : "[name]-[hash]"}.js`,
    chunkFilename: `js/${env.dev ? "[name]" : "[name]-[hash]"}.js`,
    publicPath: "/assets/"
  },
  node: {
    __dirname: true
  }
})

module.exports = configure
