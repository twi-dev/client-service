import {createElement as h} from "react"
import {Provider} from "mobx-react"

import isFunction from "lodash/isFunction"

import getName from "lib/helper/component/getName"

const provider = (stores = {}) => Target => {
  const ModelsProvider = props => (
    h(
      Provider, isFunction(stores) ? stores(props) : stores,

      h(Target, props)
    )
  )

  ModelsProvider.displayName = `ModelsProvider(${getName(Target)})`

  return ModelsProvider
}

export default provider
