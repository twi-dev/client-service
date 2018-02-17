import {h, Component} from "preact"
import {shape, func, string} from "prop-types"

import Fragment from "common/component/Fragment"
import Title from "common/component/Title"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Form/Input"
import Link from "module/auth/common/component/Form/Link"
import Fields from "module/auth/common/component/Form/Fields"
import Button from "module/auth/common/component/Form/Button"
import Footer from "module/auth/common/component/Form/Footer"

import withRedirect from "module/auth/common/component/Redirect"

import Model from "./Model"

import {container} from "./login.sss"

@withRedirect
class Login extends Component {
  static getInitialProps = async () => ({
    auth: Model.create({})
  })

  static propTypes = {
    onError: func.isRequired,
    auth: shape({
      login: string,
      password: string,
      updateLogin: func.isRequired,
      updatePassword: func.isRequired,
    }).isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired
  }

  __login = () => {
    this.props.auth.authenticate()
      .then(() => this.props.history.push("/"))
      .catch(this.props.onError)
  }

  render() {
    const {auth} = this.props

    return (
      <Fragment>
        <Title title="Login" />
        <Form class={container} onSubmit={this.__login}>
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
            <Button disabled={!auth.isValid}>Log in</Button>
          </Fields>
          <Footer>
            <Link href to="/auth/signup">Have no account yet?</Link>
            <Link href to="/auth/recover">Forgot your password?</Link>
          </Footer>
        </Form>
      </Fragment>
    )
  }
}

export default Login
