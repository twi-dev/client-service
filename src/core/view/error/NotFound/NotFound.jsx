import {h} from "preact"
import {Link} from "react-router-dom"

import {container, content, image} from "./not-found.sss"

import Image from "./not-found.svg"

const NotFound = () => (
  <div class={container}>
    <div class={content}>
      <div class={image}>
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
)

export default NotFound
