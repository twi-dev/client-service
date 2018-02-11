import {h} from "preact"

import {container, content, image} from "./not-found.sss"

import Image from "./not-found.svg"

const NotFound = () => (
  <div class={container}>
    <div class={content}>
      <div class={image}>
        <Image />
      </div>
      <div>
        Page Not Found
      </div>
    </div>
  </div>
)

export default NotFound
