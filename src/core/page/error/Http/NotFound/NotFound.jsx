import {h} from "preact"
import {Link} from "react-router-dom"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import {container, content, image, message, code} from "./not-found.sss"

import Image from "./not-found.svg"

const NotFound = () => (
  <Fragment>
    <Title title="Page Not Found" />
    <div class={container}>
      <div class={content}>
        <div class={image}>
          <Image />
        </div>
        <div class={message}>
          <div>There are no books out there, princess!</div>
          <div>
            <Link href to="/">Let‘s head home?</Link>
          </div>
        </div>
        <div class={code}>404</div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
