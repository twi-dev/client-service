function concat(...strings) {
  let res = ""

  for (const string of strings) {
    if (string && typeof string !== "object") {
      res += String(string)
    }
  }

  return res
}

export default concat
