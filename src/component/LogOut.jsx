import {func, string, node, oneOfType} from "prop-types"
import {createElement, useState} from "react"

import useStore from "lib/hook/useStore"

import logOut from "api/mutation/auth/logOut"
import Context from "model/User/Viewer/Context"

function LogOut({onError, button, ...props}) {
  const [isLoading, set] = useState(false)

  const {unsign} = useStore(Context)

  function handleLogOut() {
    function onFulfilled() {
      set(false)
      unsign()
    }

    logOut().then(onFulfilled).catch(onError)
  }

  return createElement(
    "button",

    {
      ...props,

      disabled: isLoading,
      onClick: handleLogOut
    }
  )
}

LogOut.propTypes = {
  onError: func,
  button: oneOfType([string, node]),
}

LogOut.defaultProps = {
  onError: console.error,
  button: undefined
}

export default LogOut
