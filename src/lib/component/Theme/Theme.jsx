import {createElement, useState, Fragment} from "react"
import {node} from "prop-types"

import Helmet from "react-helmet"
import useMount from "react-use/lib/useMount"
import useUnmount from "react-use/lib/useUnmount"

import {light, dark} from "./colors.css"

function Theme({children}) {
  const darkMode = matchMedia("(prefers-color-scheme: dark)")
  const [isOn, toggle] = useState(darkMode.matches)

  const onModeChange = ({matches}) => toggle(matches)

  useMount(() => darkMode.addListener(onModeChange))

  useUnmount(() => darkMode.removeListener(onModeChange))

  return (
    <Fragment>
      <Helmet>
        <body className={isOn ? dark : light} />
      </Helmet>

      {children}
    </Fragment>
  )
}

Theme.propTypes = {
  children: node.isRequired
}

export default Theme
