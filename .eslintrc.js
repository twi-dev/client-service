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
    react: {
      pragma: "createElement",
      fragment: "Fragment"
    },
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

    "no-unused-expressions": 0,
    "no-constant-condition": ["error", {
      checkLoops: false
    }],

    "operator-linebreak": ["error", "before"],
    "func-names": ["error", "always", {
      generators: "never"
    }],
    "prefer-const": ["error", {"destructuring": "all"}],

    "react/static-property-placement": ["error", "static public field"],
    "react/state-in-constructor": 0,
    "react/button-has-type": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-fragments": ["error", "element"]
  }
}
