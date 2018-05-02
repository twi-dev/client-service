import pick from "lodash/pick"

const getData = (...keys) => res => pick(res.data, ...keys)

export default getData
