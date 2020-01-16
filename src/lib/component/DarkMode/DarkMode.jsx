import {createElement, useState, Fragment} from "react"
import {node} from "prop-types"

import Helmet from "react-helmet"
import useMount from "react-use/lib/useMount"
import useUnmount from "react-use/lib/useUnmount"

import {light, dark} from "./colors.css"

import Context from "./Context"

function DarkMode({children}) {
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

      <Context.Provider value={isOn}>
        {children}
      </Context.Provider>
    </Fragment>
  )
}

DarkMode.propTypes = {
  children: node.isRequired
}

export default DarkMode
