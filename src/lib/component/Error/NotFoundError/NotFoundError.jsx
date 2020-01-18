import {createElement, Fragment} from "react"
import {Link} from "react-router-dom"

import logErrors from "lib/hoc/logErrors"
import Title from "lib/component/Title"

import {container, content, image, message, code} from "./not-found-error.css"

import Image from "./not-found-error.svg"

const NotFoundError = () => (
  <Fragment>
    <Title title="Oops..." />

    <div className={container}>
      <div className={content}>
        <div className={image}>
          <Image />
        </div>
        <div className={message}>
          <div>There are no books out there, princess!</div>
          <div>
            <Link to="/">Go back to the home page?</Link>
          </div>
        </div>
        <div className={code}>404</div>
      </div>
    </div>
  </Fragment>
)

export default NotFoundError |> logErrors
