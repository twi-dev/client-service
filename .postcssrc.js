const {join} = require("path")

module.exports = ({env}) => ({
  map: env !== "production",
  parser: "sugarss",
  plugins: {
    "postcss-use": {
      resolveFromFile: true,
      modules: "*"
    },
    "postcss-import": {
      root: join(__dirname, "src")
    },
    lost: {},
    "postcss-normalize": {},
    "postcss-preset-env": {},
    cssnano: env === "production" ? {} : false
  }
})
