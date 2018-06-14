const readdirSync = require("fs").readdirSync
const join = require("path").join

const UglifyJS = require("uglifyjs-webpack-plugin")

const {devServer = {}} = require("../../package.json")

const ROOT = join(__dirname, "..", "..")

function mapDir(path, fn) {
  const dir = readdirSync(path)

  const res = []

  for (const file of dir) {
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
    hints: env.dev ? false : "error",

    // ~320 KB, don't forget to enable gzip on your server
    maxEntrypointSize: 320000,
    maxAssetSize: 320000
  },
  optimization: {
    minimize: !env.dev,
    minimizer: [
      new UglifyJS({
        test: /\.(m?js|jsx)$/,
        parallel: true,
        uglifyOptions: {
          // keep_fnames: true,
          compress: {
            reduce_funcs: false
          },
          output: {
            ecma: 6,
            comments: false
          }
        }
      })
    ],
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all"
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
      react: "preact-compat",
      "react-dom": "preact-compat",
    }
  },
  plugins: readPlugins(env),
  module: {
    rules: readLoaders(env)
  },
  devServer: {
    hot: true,
    compress: true,
    port: devServer.port || 1339,
    contentBase: join(ROOT, "static"),
    historyApiFallback: {
      index: "view/container.html",
      disableDotRule: true
    }
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
