import {func, string, oneOfType} from "prop-types"
import {createElement, useState} from "react"

import useStore from "lib/hook/useStore"

import logOut from "api/mutation/auth/logOut"
import Context from "model/User/Viewer/Context"

function LogOut({onError, button, ...props}) {
  const [isLoading, set] = useState(false)

  const {unsign} = useStore(Context)

  function exec() {
    function onFulfilled() {
      set(false)
      unsign()
    }

    logOut().then(onFulfilled).catch(onError)
  }

  return createElement(button, {
    ...props,

    disabled: isLoading,
    onClick: exec
  })
}

LogOut.propTypes = {
  onError: func,
  button: oneOfType([string, func]),
}

LogOut.defaultProps = {
  onError: console.error,
  button: "button"
}

export default LogOut
