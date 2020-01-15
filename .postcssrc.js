const {join} = require("path")

const resolve = require("./build/helper/cssImportResolver")

module.exports = ({env, file}) => ({
  map: env !== "production",
  parser: file.extname === ".scss" ? "postcss-scss" : false,
  plugins: {
    "postcss-import": {
      root: join(__dirname, "src"),
      resolve
    },
    "postcss-use": {
      resolveFromFile: true,
      modules: "*"
    },
    lost: {},
    "postcss-normalize": {},
    "postcss-preset-env": {},
    "postcss-font-magician": {},
    cssnano: env === "production" ? {} : false
  }
})
