import {h} from "preact"
import {observer} from "mobx-preact"
import {PropTypes as types, func, element, arrayOf} from "prop-types"

import cn from "classnames"

import preventDefault from "core/helper/decorator/preventDefault"

import {container, body, content} from "./form.sss"

const Form = ({children, onSubmit, ...props}) => (
  <div class={cn(container, props.class)}>
    <form class={body} onSubmit={preventDefault(onSubmit)}>
      <div class={content}>
        {children}
      </div>
    </form>
  </div>
)

Form.propTypes = {
  class: types.string,
  onSubmit: func.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

Form.defaultProps = {
  class: undefined,
}

export default observer(Form)
