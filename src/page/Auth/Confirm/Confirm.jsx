import {createElement, Fragment} from "react"
import {useParams} from "react-router-dom"

import cn from "classnames"

import useTitle from "lib/hook/useTitle"
import useSuspender from "lib/hook/useSuspender"

import confirm from "common/graphql/mutation/auth/confirm"

import {container, message, failed} from "./confirm.css"

function Confirm() {
  const {hash} = useParams()

  useTitle("Account confirmation")

  const isActivated = useSuspender(
    {
      hash,
      url: import.meta.url
    },

    () => confirm(hash)
  )

  return (
    <div className={container}>
      <div className={cn(message, {[failed]: !isActivated})}>
        {
          do {
            if (isActivated) {
              <Fragment>
                <div>Your account has been activated successfully!</div>
                <div>
                  You will be redirected to the home page in a moment.
                </div>
              </Fragment>
            } else {
              <Fragment>
                <div>Cannot activate your account.</div>
                <div>Probably the activation email has been expired.</div>
              </Fragment>
            }
          }
        }
      </div>
    </div>
  )
}

export default Confirm
