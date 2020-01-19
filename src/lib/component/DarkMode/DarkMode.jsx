import {createElement, useState, Fragment} from "react"
import {node} from "prop-types"

import Helmet from "react-helmet"
import useMount from "react-use/lib/useMount"
import useUnmount from "react-use/lib/useUnmount"

import {light, dark} from "./colors.css"

import Context from "./Context"

/**
 * Manages an application wide dark mode by injecting
 * .light or .dark class to <body> tag. It uses prefers-color-scheme to
 * check whether the dark mode on or off in a system's preferences.
 */
function DarkMode({children}) {
  const darkMode = matchMedia("(prefers-color-scheme: dark)")
  const [isActive, toggle] = useState(darkMode.matches)

  const onModeChange = ({matches}) => toggle(matches)

  useMount(() => darkMode.addListener(onModeChange))

  useUnmount(() => darkMode.removeListener(onModeChange))

  return (
    <Fragment>
      <Helmet>
        <body className={isActive ? dark : light} />
      </Helmet>

      <Context.Provider value={{isActive, toggle}}>
        {children}
      </Context.Provider>
    </Fragment>
  )
}

DarkMode.propTypes = {
  children: node.isRequired
}

export default DarkMode
