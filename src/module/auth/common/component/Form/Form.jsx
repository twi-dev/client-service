import {h} from "preact"
import {observer} from "mobx-preact"
import {PropTypes as types, element, arrayOf} from "prop-types"

import cn from "classnames"

import preventDefault from "core/helper/decorator/preventDefault"

import Footer from "../Footer"
import Link from "../Link"
import Button from "../Button"
import Fields from "../Fields"

import {container, body, content} from "./form.sss"

const Form = ({buttonText, buttonClass, children, ...props}) => (
  <div class={cn(container, props.class)}>
    <form class={body} onSubmit={preventDefault()}>
      <div class={content}>
        <Fields>
          {children}
          <Button class={buttonClass}>
            {buttonText}
          </Button>
        </Fields>
        <Footer>
          <Link href to="/auth/signup">Have no account yet?</Link>
          <Link href to="/auth/recover">Forgot your password?</Link>
        </Footer>
      </div>
    </form>
  </div>
)

Form.propTypes = {
  class: types.string,
  buttonClass: types.string,
  buttonText: types.string.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

Form.defaultProps = {
  class: null,
  buttonClass: null
}

export default observer(Form)
