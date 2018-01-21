import isFunction from "lodash/isFunction"

const prevent = fn => event => void event.preventDefault(void fn(event))

const preventDefault = fn => prevent(isFunction(fn) ? fn : () => {})

export default preventDefault
