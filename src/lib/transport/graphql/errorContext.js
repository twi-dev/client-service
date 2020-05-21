import {onError} from "apollo-link-error"

const errorLink = onError(({networkError, graphQLErrors}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path}) => console.warn(
      `[GraphQL error]: Message: ${message}, `
        + `Location: ${locations}, Path: ${path}`
    ))
  }

  if (networkError) {
    console.warn(`[Network error]: ${networkError}`)
  }
})

export default errorLink
