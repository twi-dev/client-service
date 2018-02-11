import {h} from "preact"

import {container} from "./not-found.sss"

import Image from "./not-found.svg"

const NotFound = () => (
  <div class={container}>
    <div>
      <Image />
    </div>
    <div>
      Page Not Found
    </div>
  </div>
)

export default NotFound
