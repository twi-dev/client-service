import {types} from "mobx-state-tree"

const values = Object.values

const {enumeration} = types

const states = {
  HIDDEN: "hidden",
  VISIBLE: "visible",
  OPEN: "open",
  CLOSED: "closed"
}

const State = enumeration("State", values(states))

export default State
export {states}
