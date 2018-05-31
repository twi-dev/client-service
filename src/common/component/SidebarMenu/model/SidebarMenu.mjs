import {types} from "mobx-state-tree"

const {model, boolean} = types

const schema = {
  isOpen: boolean
}

const before = ({isOpen, ...snapshot} = {}) => ({...snapshot, isOpen: !!isOpen})

const actions = self => ({
  open: () => void (self.isOpen = true),

  close: () => void (self.isOpen = false)
})

const SidebarMenu = model("SidebarMenu", schema)
  .preProcessSnapshot(before)
  .actions(actions)

export default SidebarMenu
