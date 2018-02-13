import {h} from "preact"
import {shape, func, string} from "prop-types"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Input"

import Model from "./SignupModel"

const Login = ({auth}) => (
  <Form buttonText="Log in">
    <Input
      type="text"
      name="login"
      placeholder="Login..."
      autocomplete="off"
      value={auth.login}
      onInput={auth.updateLogin}
    />
    <Input
      type="email"
      name="email"
      placeholder="Email..."
      autocomplete="off"
      value={auth.email}
      onInput={auth.updateLogin}
    />
    <Input
      type="password"
      name="password"
      placeholder="Password..."
      autocomplete="off"
      value={auth.password}
      onInput={auth.updatePassword}
    />
  </Form>
)

Login.propTypes = {
  auth: shape({
    login: string,
    password: string,
    updateTextField: func.isRequired
  }).isRequired
}

Login.getInitialProps = async () => ({
  auth: Model.create({})
})

export default Login
