import {createElement as h} from "react"
import {Redirect as BaseRedirect} from "react-router-dom"

import omit from "lodash/omit"

import getName from "core/helper/component/getName"

const redirect = ({getUrl, exclude = []} = {}) => Target => {
  function Redirect(props) {
    const to = getUrl(props)

    return to ? h(BaseRedirect, {to}) : h(Target, omit(props, exclude))
  }

  Redirect.displayName = `Redirect(${getName(Target)})`

  return Redirect
}

export default redirect
