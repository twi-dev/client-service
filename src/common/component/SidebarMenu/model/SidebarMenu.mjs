import {types} from "mobx-state-tree"

import State, {states} from "./State"

const {model} = types

const schema = {
  state: State
}

const before = snapshot => ({
  ...snapshot, state: states.CLOSED
})

const views = self => ({
  get isOpen() {
    return self.state === states.OPEN
  },

  get isHidden() {
    return self.state === states.HIDDEN
  }
})

const actions = self => {
  /**
   * @private
   */
  const setState = state => void (self.state = state)

  return {
    open() {
      if (!self.isHidden) {
        setState(states.OPEN)
      }
    },

    close: () => setState(states.CLOSED),

    show: () => setState(states.VISIBLE),

    hide() {
      if (self.isOpen) {
        self.close()
      }

      setState(states.HIDDEN)
    }
  }
}

const SidebarMenu = model("SidebarMenu", schema)
  .preProcessSnapshot(before)
  .actions(actions)
  .views(views)

export default SidebarMenu
