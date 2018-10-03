import React from "react"
import cn from "classnames"

import {observer} from "mobx-react"
import {string, func, element, arrayOf} from "prop-types"

import preventDefault from "core/helper/decorator/preventDefault"

import {container, body, content} from "./form.scss"

const Form = ({children, className, onSubmit}) => (
  <div className={container}>
    <form className={cn(body, className)} onSubmit={preventDefault(onSubmit)}>
      <div className={content}>
        {children}
      </div>
    </form>
  </div>
)

Form.propTypes = {
  className: string,
  onSubmit: func.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

Form.defaultProps = {
  className: undefined,
}

export default Form |> observer
