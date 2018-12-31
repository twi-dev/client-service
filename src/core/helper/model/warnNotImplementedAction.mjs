import {flow, getType} from "mobx-state-tree"

import words from "core/helper/string/concatWords"

const warnNotImplementedAction = (model, ...messages) => () => {
  const type = getType(model)

  console.warn(
    `This action must be implemented on model extends from ${type.name}`
  )

  if (messages.length > 0) {
    console.warn(words(messages))
  }
}

warnNotImplementedAction.async = (model, ...messages) => async () => (
  warnNotImplementedAction(model, ...messages)()
)

warnNotImplementedAction.flow = (model, ...messages) => flow(function* () {
  return warnNotImplementedAction(model, ...messages)()
})

export default warnNotImplementedAction
