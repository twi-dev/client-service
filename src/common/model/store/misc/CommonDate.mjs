import {types} from "mobx-state-tree"

import toDate from "date-fns/toDate"

const {model} = types

const schema = {
  raw: types.Date
}

const before = ({raw} = {}) => ({raw: raw ? toDate(raw) : null})

const CommonDate = model("CommonDate", schema).preProcessSnapshot(before)

export default CommonDate
