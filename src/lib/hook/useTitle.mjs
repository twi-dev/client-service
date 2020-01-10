import setTitle from "react-use/lib/useTitle"
import isString from "lodash/isString"

const {isArray} = Array

const defaults = {
  delimiter: "–",
  prefix: undefined,
  title: undefined,
  suffix: undefined
}

/**
 * Enhances the `useTitle` hook from `react-use` library with optional params.
 *
 * @param {object | string} options – when set as string, will be used as title
 * @param {string | array} [options.title = undefined] – a page title section(s)
 * @param {string} [options.prefix = undefined] – title prefix
 * @param {string} [options.suffix = undefined] – title suffix
 * @param {string} [options.delimiter = "-"] – title sections delimiter
 */
function useTitle(options = {}) {
  if (isString(options)) {
    options = {title: options}
  }

  let {prefix, title, suffix, delimiter} = {...defaults, ...options}

  if (!isArray(title)) {
    title = [title]
  }

  if (delimiter) {
    delimiter = ` ${String(delimiter).trim()} `
  }

  setTitle([prefix, ...title, suffix].filter(Boolean).join(delimiter))
}

export default useTitle
