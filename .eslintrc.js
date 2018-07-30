module.exports = {
  parser: "babel-eslint",
  plugins: [
    "react"
  ],
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        cwd: __dirname,
        root: [
          "src"
        ]
      }
    }
  },
  extends: [
    "airbnb",
    "@octetstream"
  ],
  rules: {
    "jsx-a11y/anchor-is-valid": ["error", {
      components: ["Link"],
      specialLink: ["to", "hrefLeft", "hrefRight"],
      aspects: ["noHref", "invalidHref", "preferButton"]
    }],

    "no-unused-expressions": 0
  }
}
