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

import Model from "./Model"

import {container, field, button, linkLogin} from "./signup.sss"

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
      updateEmail: func.isRequired,
      updatePassword: func.isRequired,
    }).isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired
  }

  __signup = () => {
    this.props.auth.createUser()
      .then(() => this.props.history.push("/"))
      .catch(this.props.onError)
  }

  render() {
    const {auth} = this.props

    return (
      <Fragment>
        <Title title="Signup" />
        <Form class={container} onSubmit={this.__signup}>
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
            <Button class={button}>Sign up</Button>
          </Fields>
          <Footer>
            <Link class={linkLogin} href to="/auth/login">
              Already have an account?
            </Link>
          </Footer>
        </Form>
      </Fragment>
    )
  }
}

export default Login
