import {createElement as h} from "react"
import {Provider} from "mobx-react"

import isFunction from "lodash/isFunction"

import getName from "core/helper/component/getName"

const provider = (stores = {}) => Target => {
  const ProvideStores = props => h(
    Provider, (isFunction(stores) ? stores(props) : stores),

    h(Target, props)
  )

  ProvideStores.displayName = `ProvideStores(${getName(Target)})`

  return ProvideStores
}

export default provider
