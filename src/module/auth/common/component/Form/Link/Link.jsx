import {h} from "preact"
import {Link as RouterLink} from "react-router-dom"
import {PropTypes as types} from "prop-types"

import cn from "classnames"
import omit from "lodash/omit"

import {container} from "./link.sss"

const Link = props => (
  <div class={cn(container, props.class)}>
    <RouterLink {...{...omit(props, ["class", "className"])}} />
  </div>
)

Link.propTypes = {
  class: types.string
}

Link.defaultProps = {
  class: undefined
}

export default Link
