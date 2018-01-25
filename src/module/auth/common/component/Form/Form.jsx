import {h} from "preact"
import {PropTypes as types, element, arrayOf} from "prop-types"

import preventDefault from "core/helper/decorator/preventDefault"

import form, {container, body, buttonPrimary} from "./form.sss"

const Form = ({title, buttonText, children}) => (
  <div class={container}>
    <form class={body} onSubmit={preventDefault()}>
      <div class={form.title}>{title}</div>
      <div>{children}</div>
      <button class={buttonPrimary}>{buttonText}</button>
    </form>
  </div>
)

Form.propTypes = {
  title: types.string.isRequired,
  buttonText: types.string.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

export default Form
