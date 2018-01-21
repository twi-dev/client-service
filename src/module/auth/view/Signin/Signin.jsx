import {h} from "preact"

import Form from "module/auth/common/component/Form"

const Signin = () => (
  <Form title="Signin" buttonText="Sign in">
    <input type="text" placeholder="Email or login..." />
    <input type="password" placeholder="Password..." />
  </Form>
)

export default Signin
