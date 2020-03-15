import {createElement, Fragment} from "react"
import {instanceOf} from "prop-types"

import logErrors from "lib/hoc/logErrors"

import Title from "lib/component/Title"

import {container} from "./application-error.css"

const ApplicationError = ({error}) => (
  <Fragment>
    <Title title="Aw, snap!" />

    <div className={container}>
      {
        do {
          if (process.env.NODE_ENV !== "production") {
            <div>{error.message}</div>
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

ApplicationError.propTypes = {
  error: instanceOf(Error).isRequired
}

export default ApplicationError |> logErrors
