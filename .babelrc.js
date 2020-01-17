module.exports = {
  presets: [
    ["@babel/react", {
      pragma: "createElement",
      pragmaFrag: "Fragment"
    }],
    ["@babel/env", {
      modules: false,
      exclude: ["transform-regenerator"],
    }]
  ],
  plugins: [
    "react-hot-loader/babel",
    "@babel/transform-runtime",
    ["@babel/proposal-decorators", {
      legacy: true
    }],
    ["@babel/proposal-class-properties", {
      loose: true
    }],
    ["@babel/proposal-pipeline-operator", {
      proposal: "minimal"
    }],
    "@babel/proposal-optional-catch-binding",
    "@babel/proposal-do-expressions",
    ["@babel/proposal-object-rest-spread", {
      useBuiltIns: true,
    }],
    ["module-resolver", {
      root: ["src"],
    }],
    "emotion"
  ],
  env: {
    production: {
      plugins: ["transform-react-remove-prop-types"]
    }
  }
}
