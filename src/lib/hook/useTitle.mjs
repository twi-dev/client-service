import setTitle from "react-use/lib/useTitle"
import isString from "lodash/isString"

const {isArray} = Array

const defaults = {
  delimiter: "–",
  prefix: undefined,
  base: undefined,
  suffix: undefined
}

/**
 * Enhances the `useTitle` hook from `react-use` library with optional params.
 *
 * @param {object | string} options – when set as string, will be used as title
 * @param {string | array} [options.base = undefined] – a page title section(s)
 * @param {string} [options.prefix = undefined] – title prefix
 * @param {string} [options.suffix = undefined] – title suffix
 * @param {string} [options.delimiter = "-"] – title sections delimiter
 */
function useTitle(options = {}) {
  if (isString(options)) {
    options = {base: options}
  }

  let {prefix, base: title, suffix, delimiter} = {...defaults, ...options}

  if (!isArray(title)) {
    title = [title]
  }

  if (delimiter) {
    delimiter = ` ${String(delimiter).trim()} `
  }

  setTitle([prefix, ...title, suffix].filter(Boolean).join(delimiter), {
    restoreOnUnmount: true
  })
}

export default useTitle
