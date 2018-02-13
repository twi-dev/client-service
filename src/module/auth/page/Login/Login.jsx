import {h} from "preact"
import {shape, func, string} from "prop-types"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Form/Input"
import Link from "module/auth/common/component/Form/Link"
import Fields from "module/auth/common/component/Form/Fields"
import Button from "module/auth/common/component/Form/Button"
import Footer from "module/auth/common/component/Form/Footer"

import Model from "./LoginModel"

const Login = ({auth}) => (
  <Form>
    <Fields>
      <Input
        type="email"
        name="login"
        placeholder="Email or login..."
        autocomplete="username email"
        value={auth.login}
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
      <Button>Log in</Button>
    </Fields>
    <Footer>
      <Link href to="/auth/signup">Have no account yet?</Link>
      <Link href to="/auth/recover">Forgot your password?</Link>
    </Footer>
  </Form>
)

Login.getInitialProps = async () => ({
  auth: Model.create({})
})

Login.propTypes = {
  auth: shape({
    login: string,
    password: string,
    updateLogin: func.isRequired,
    updatePassword: func.isRequired,
  }).isRequired
}

export default Login
