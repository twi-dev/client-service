import flat from "lodash/flatten"

const concatFromArray = (strings, sep) => (
  flat(strings, Infinity).join(sep || "")
)

export default concatFromArray
