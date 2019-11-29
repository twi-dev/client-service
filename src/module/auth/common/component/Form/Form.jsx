import {string, func, node} from "prop-types"
import {createElement} from "react"
import {observer} from "mobx-react"

import cn from "classnames"

import preventDefault from "lib/helper/decorator/preventDefault"

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
  children: node.isRequired
}

Form.defaultProps = {
  className: undefined,
}

export default Form |> observer
