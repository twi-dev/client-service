import {h} from "preact"
import {observer} from "mobx-preact"
import {PropTypes as types, element, arrayOf} from "prop-types"

import cn from "classnames"

import preventDefault from "core/helper/decorator/preventDefault"

import {container, body, content} from "./form.sss"

const Form = ({buttonText, children, ...props}) => (
  <div class={cn(container, props.class)}>
    <form class={body} onSubmit={preventDefault()}>
      <div class={content}>
        {children}
      </div>
    </form>
  </div>
)

Form.propTypes = {
  class: types.string,
  buttonText: types.string.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

Form.defaultProps = {
  class: undefined
}

export default observer(Form)
