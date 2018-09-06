/**
 * A function that just helps to reduce code for ApolloClient cache updationg
 *
 * @param {object} query
 * @param {(data: object, response: any) => void} fn
 *
 * @return {(proxy: object, response: object) => void}
 */
const updateCache = (query, fn) => (proxy, response) => {
  const data = proxy.readQuery({query})

  fn(data, response)

  proxy.writeQuery({proxy, data})
}

export default updateCache
