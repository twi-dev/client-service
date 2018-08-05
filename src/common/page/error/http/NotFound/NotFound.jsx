import React, {Fragment} from "react"

import {Link} from "react-router-dom/Link"

import Title from "common/component/Title"

import {container, content, image} from "./not-found.scss"

import Image from "./not-found.svg"

const NotFound = () => (
  <Fragment>
    <Title title="Page Not Found" />
    <div className={container}>
      <div className={content}>
        <div className={image}>
          <Image />
        </div>
        <div>
          There are no books out there, princess!
        </div>
        <div>
          <Link href to="/">Let‘s go back home?</Link>
        </div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
