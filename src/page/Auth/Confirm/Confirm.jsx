import {useParams, Redirect} from "react-router-dom"
import {createElement, Fragment} from "react"

import createSuspender from "use-suspender"
import cn from "classnames"

import Delay from "lib/component/Delay"
import useTitle from "lib/hook/useTitle"

import confirm from "api/mutation/auth/confirm"

import {container, message, failed} from "./confirm.css"

const useConfirm = createSuspender(confirm)

function Confirm() {
  useTitle("Account confirmation")

  const {hash} = useParams()

  const isActivated = useConfirm(hash)

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

                <Delay amount="5s">
                  <Redirect to="/" />
                </Delay>
              </Fragment>
            } else {
              <Fragment>
                <div>Cannot activate your account.</div>
                <div>Probably the activation link has been expired.</div>
              </Fragment>
            }
          }
        }
      </div>
    </div>
  )
}

export default Confirm
