const {join} = require("path")

// NOTE: This is used just for migration from SugarSS to SCSS
const parsers = {
  ".scss": "postcss-scss",
  ".sss": "sugarss"
}

const getParser = extname => parsers[extname] || false

module.exports = ({env, file}) => ({
  map: env !== "production",
  parser: getParser(file.extname),
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
