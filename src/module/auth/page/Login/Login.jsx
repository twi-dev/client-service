import {h} from "preact"
import {shape, func, string} from "prop-types"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Input"

import LoginModel from "./LoginModel"

const Login = ({auth: {login, password, updateLogin, updatePassword}}) => (
  <Form buttonText="Log in">
    <Input
      type="email"
      name="login"
      placeholder="Email or login..."
      autocomplete="username email"
      value={login}
      onInput={updateLogin}
    />
    <Input
      type="password"
      name="password"
      placeholder="Password..."
      autocomplete="current-password"
      value={password}
      onInput={updatePassword}
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
  auth: LoginModel.create({})
})

export default Login
