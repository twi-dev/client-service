import {types as t} from "mobx-state-tree"

import toDate from "date-fns/toDate"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import formatRelative from "date-fns/formatRelative"
import formatDistance from "date-fns/formatDistance"
import differenceInDays from "date-fns/differenceInCalendarDays"

const before = time => ({raw: time ? toDate(parseISO(time)) : undefined})

const CommonDate = t.model("CommonDate", {
  raw: t.Date
})
  .preProcessSnapshot(before)
  .views(self => ({
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
  }))

export default CommonDate
