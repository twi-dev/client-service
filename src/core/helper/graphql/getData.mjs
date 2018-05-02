import pick from "lodash/pick"

const isArray = Array.isArray

const getData = (...keys) => res => {
  const data = pick(res.data, ...keys)

  if (keys.length === 1) {
    if (!isArray(keys[0])) {
      return data[keys[0]]
    }

    if (keys[0][0].length === 1) {
      return keys[0][0]
    }
  }

  return data
}

export default getData
