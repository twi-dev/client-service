import React from "react"

import {func} from "prop-types"

import Context from "./Context"

const Consumer = ({children}) => (
  <Context.Consumer>
    {({error}) => children(error)}
  </Context.Consumer>
)

Consumer.displayName = "ErrorHandlerConsumer"

Consumer.propTypes = {
  children: func.isRequired
}

export default Consumer
