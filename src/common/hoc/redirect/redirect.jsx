import {Redirect as Base} from "react-router-dom"
import {createElement as h} from "react"

import omit from "lodash/omit"

import getName from "lib/helper/component/getName"

const redirect = ({getUrl, exclude = []} = {}) => Target => {
  function Redirect(props) {
    const to = getUrl(props)

    return to ? h(Base, {to}) : h(Target, omit(props, exclude))
  }

  Redirect.displayName = `Redirect(${getName(Target)})`

  return Redirect
}

export default redirect
