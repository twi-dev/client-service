import {oneOfType, arrayOf, shape, string} from "prop-types"

import useTitle from "lib/hook/useTitle"

function Title({title}) {
  useTitle(title)

  return null
}

Title.propTypes = {
  title: oneOfType([
    string,
    shape({
      delimiter: string,
      prefix: string,
      base: oneOfType([string, arrayOf(string)]),
      suffix: string
    })
  ]).isRequired
}

export default Title
