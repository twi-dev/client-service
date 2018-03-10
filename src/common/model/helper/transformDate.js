import parse from "date-fns/parse"

const transformDate = date => date ? parse(date) : date

export default transformDate
