import React, {Component} from "react"

import getName from "core/helper/component/getName"

const reporter = Target => {
  class Reporter extends Component {
    static displayName = `ErrorHandlerReporter(${getName(Target)})`

    componentDidCatch(error, info) {}

    render() {
      return (
        <div>Foo</div>
      )
    }
  }

  return Reporter
}

export default reporter
