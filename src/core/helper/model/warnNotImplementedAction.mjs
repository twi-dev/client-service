import {flow, getType} from "mobx-state-tree"

import flat from "core/helper/array/flat"

const warnNotImplementedAction = (model, ...messages) => () => {
  const type = getType(model)

  console.warn(
    `This action must be implemented on model extends from ${type.name}`
  )

  if (messages.length > 0) {
    console.warn(flat(messages).join(" "))
  }
}

warnNotImplementedAction.async = (model, ...messages) => async () => (
  warnNotImplementedAction(model, ...messages)()
)

warnNotImplementedAction.flow = (model, ...messages) => flow(function* () {
  return warnNotImplementedAction(model, ...messages)()
})

export default warnNotImplementedAction
