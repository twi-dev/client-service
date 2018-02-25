import {onError} from "apollo-link-error"

const errorContext = onError(({response, graphQLErrors}) => {
  // console.log(
  //   graphQLErrors.find(({code}) => code === "HTTP_NOT_FOUND_EXCEPTION")
  // )

  // response.errors = [new Error("Foo")]
})

export default errorContext
