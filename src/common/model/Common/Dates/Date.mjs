import {types} from "mobx-state-tree"

import toDate from "date-fns/toDate"
import format from "date-fns/format"
import formatRelative from "date-fns/formatRelative"
import formatDistance from "date-fns/formatDistance"
import differenceInDays from "date-fns/differenceInCalendarDays"

const {model} = types

const schema = {
  raw: types.Date
}

const views = self => ({
  get relative() {
    return formatRelative(self.raw, Date.now())
  },

  get fromNow() {
    const days = self.daysFromNow

    if (Math.abs(differenceInDays(self.raw, Date.now())) > 1) {
      return days
    }

    return `${days} at ${format(self.raw, "HH:mm")}`
  },

  get daysFromNow() {
    const now = Date.now()

    switch (Math.abs(differenceInDays(self.raw, now))) {
      case 0:
        return "Today"
      case 1:
        return "Yesterday"
      default:
        return formatDistance(self.raw, now, {addSuffix: true})
    }
  }
})

const before = time => ({raw: time ? toDate(time) : undefined})

const CommonDate = model("CommonDate", schema)
  .preProcessSnapshot(before)
  .views(views)

export default CommonDate
