import React from "react"
import cn from "classnames"

import {observer} from "mobx-react"
import {string, func, element, arrayOf} from "prop-types"

import preventDefault from "core/helper/decorator/preventDefault"

import {container, body, content} from "./form.sss"

const Form = ({children, onSubmit, ...props}) => (
  <div className={cn(container, props.class)}>
    <form className={body} onSubmit={preventDefault(onSubmit)}>
      <div className={content}>
        {children}
      </div>
    </form>
  </div>
)

Form.propTypes = {
  class: string,
  onSubmit: func.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

Form.defaultProps = {
  class: undefined,
}

export default Form |> observer
