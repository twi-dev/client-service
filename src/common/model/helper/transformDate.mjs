import toDate from "date-fns/toDate"

const transformDate = date => date ? toDate(date) : date

export default transformDate
