import {h} from "preact"
import {observer} from "mobx-preact"
import {PropTypes as types, element, arrayOf} from "prop-types"

import preventDefault from "core/helper/decorator/preventDefault"

import Footer from "../Footer"
import Link from "../Link"
import Button from "../Button"

import {container, body, content} from "./form.sss"

const Form = ({buttonText, children}) => (
  <div class={container}>
    <form class={body} onSubmit={preventDefault()}>
      <div class={content}>
        {children}
        <Button>{buttonText}</Button>
        <Footer>
          <Link href to="/auth/signup">Have no account yet?</Link>
          <Link href to="/auth/recover">Forgot your password?</Link>
        </Footer>
      </div>
    </form>
  </div>
)

Form.propTypes = {
  buttonText: types.string.isRequired,
  children: arrayOf(element.isRequired).isRequired
}

export default observer(Form)
