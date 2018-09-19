import React, {Fragment} from "react"
import {Link} from "react-router-dom"

import logErrors from "core/hoc/logErrors"
import Title from "common/component/Title"

import {container, content, image, message, code} from "./not-found-error.scss"

import Image from "./not-found-error.svg"

const NotFoundError = () => (
  <Fragment>
    <Title title="Page Not Found" />

    <div className={container}>
      <div className={content}>
        <div className={image}>
          <Image />
        </div>
        <div className={message}>
          <div>There is no book out there, princess!</div>
          <div>
            <Link to="/">Let‘s head home?</Link>
          </div>
        </div>
        <div className={code}>404</div>
      </div>
    </div>
  </Fragment>
)

export default NotFoundError |> logErrors
