import isFunction from "lodash/isFunction"
import debounce from "lodash/debounce"

const decorate = fn => event => event.preventDefault(void debounce(fn)(event))

const preventDefault = fn => decorate(isFunction(fn) ? fn : () => {})

export default preventDefault
