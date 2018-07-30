import {createElement as h} from "react"
import {bool} from "prop-types"

// import client from "core/transport/graphql"

import Success from "./Success"
import Failure from "./Failure"

// import confirm from "./confirm.graphql"

const Confirm = ({hasSuccessed}) => h(hasSuccessed ? Success : Failure)

// Confirm.getInitialProps = async ({match}) => ({})


Confirm.propTypes = {
  hasSuccessed: bool
}

Confirm.defaultProps = {
  hasSuccessed: false // means that recover proccess was failed
}

export default Confirm
