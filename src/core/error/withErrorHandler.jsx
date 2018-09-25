import React from "react"

import getName from "core/helper/component/getName"

import Consumer from "./Consumer"

const withErrorHandler = Target => {
  const WithErrorHandler = props => (
    <Consumer>
      {error => <Target {...{...props, error}} />}
    </Consumer>
  )

  WithErrorHandler.displayName = `WithErrorHandler(${getName(Target)})`

  return WithErrorHandler
}

export default withErrorHandler
