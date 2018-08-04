import React, {Component, Fragment} from "react"
import {instanceOf} from "prop-types"

import Title from "common/component/Title"

import {container, stack} from "./application-error.scss"

class ApplicationError extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== "production") {
      console.error(this.props.error)
    }
  }

  render() {
    const {error} = this.props

    return (
      <Fragment>
        <Title title="Aw, snap!" />
        <div className={container}>
          {
            do {
              if (process.env.NODE_ENV === "production") {
                <div>
                  <h4>{error.message}</h4>
                  <div className={stack}>{String(error.stack)}</div>
                </div>
              } else {
                <div>
                  <h4>I just don’t know what went wrong...</h4>
                  <div>
                    It seems like you have some problems
                    with accessing our service.

                    Don’t worry, we’re already working on it!
                  </div>
                </div>
              }
            }
          }
        </div>
      </Fragment>
    )
  }
}

ApplicationError.propTypes = {
  error: instanceOf(Error).isRequired
}

export default ApplicationError
