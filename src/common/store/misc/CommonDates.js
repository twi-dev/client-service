import {types} from "mobx-state-tree"

const {model, maybe} = types

const MobXDate = types.Date

const schema = {
  createdAt: MobXDate,
  updatedAt: maybe(MobXDate)
}

const CommonDates = model("CommonDates", schema)

export {schema}
export default CommonDates
