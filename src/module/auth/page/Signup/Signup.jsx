import {h} from "preact"
import {shape, func, string} from "prop-types"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Form/Input"
import Link from "module/auth/common/component/Form/Link"
import Fields from "module/auth/common/component/Form/Fields"
import Button from "module/auth/common/component/Form/Button"
import Footer from "module/auth/common/component/Form/Footer"

import Model from "./SignupModel"

import {container, field, button, link} from "./signup.sss"

const Login = ({auth}) => (
  <Form class={container}>
    <Fields>
      <Input
        type="text"
        name="login"
        placeholder="Login..."
        autocomplete="off"
        class={field}
        value={auth.login}
        onInput={auth.updateLogin}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email..."
        autocomplete="off"
        class={field}
        value={auth.email}
        onInput={auth.updateEmail}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password..."
        autocomplete="off"
        class={field}
        value={auth.password}
        onInput={auth.updatePassword}
      />
      <Button class={button}>Log in</Button>
    </Fields>
    <Footer>
      <Link class={link} href to="/auth/recover">Forgot your password?</Link>
    </Footer>
  </Form>
)

Login.propTypes = {
  auth: shape({
    login: string,
    password: string,
    updateLogin: func.isRequired,
    updateEmail: func.isRequired,
    updatePassword: func.isRequired,
  }).isRequired
}

Login.getInitialProps = async () => ({
  auth: Model.create({})
})

export default Login
