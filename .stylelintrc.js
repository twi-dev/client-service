module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "property-no-unknown": [
      true, {
        "ignoreProperties": [
          "composes"
        ]
      }
    ],
    "at-rule-no-unknown": [
      true, {
        "ignoreAtRules": [
          "use", "value", "import-normalize"
        ]
      }
    ],
    "selector-pseudo-class-no-unknown": [
      true, {
        "ignorePseudoClasses": ["global", "local"]
      }
    ]
  }
}
