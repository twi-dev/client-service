import {h} from "preact"
import {shape, func, string} from "prop-types"

import Form from "module/auth/common/component/Form"

import LoginModel from "./LoginModel"

const Login = ({auth: {login, password, updateLogin, updatePassword}}) => (
  <Form title="Login" buttonText="Sign in">
    <input
      type="text"
      name="login"
      placeholder="Email or login..."
      value={login}
      onInput={updateLogin}
    />
    <input
      type="password"
      name="password"
      placeholder="Password..."
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
