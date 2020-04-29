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
 * @param {Object<string, any> | string} params – when set as string, will be used as title
 * @param {string | array} [params.base = undefined] – a page title section(s)
 * @param {string} [params.prefix = undefined] – title prefix
 * @param {string} [params.suffix = undefined] – title suffix
 * @param {string} [params.delimiter = "-"] – title sections delimiter
 */
function useTitle(params = {}) {
  if (isString(params)) {
    params = {base: params}
  }

  let {prefix, base: title, suffix, delimiter} = {...defaults, ...params}

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
