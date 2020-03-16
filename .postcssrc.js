const {join} = require("path")

const resolve = require("./build/helper/cssImportResolver")

module.exports = ({env, file}) => ({
  map: env !== "production",
  plugins: {
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
