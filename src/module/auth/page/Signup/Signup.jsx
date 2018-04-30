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

import withRedirect from "module/auth/common/hoc/withRedirect"

import Model from "./Model"

import {container, field, button, linkLogin} from "./signup.sss"

@withRedirect class Login extends Component {
  static getInitialProps = async () => ({
    signup: Model.create({})
  })

  static propTypes = {
    onError: func.isRequired,
    signup: shape({
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
    this.props.signup.createUser()
      .then(() => this.props.history.push("/"))
      .catch(this.props.onError)
  }

  render() {
    const {signup} = this.props
    const {username, email, password} = signup

    return (
      <Fragment>
        <Title title="Signup" />
        <Form class={container} onSubmit={this.__signup}>
          <Fields>
            <Input
              type="text"
              name="username"
              placeholder="Login..."
              autocomplete="off"
              class={field}
              value={username}
              onInput={signup.updateTextField}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email..."
              autocomplete="off"
              class={field}
              value={email}
              onInput={signup.updateTextField}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password..."
              autocomplete="off"
              class={field}
              value={password}
              onInput={signup.updateTextField}
            />
            <Button class={button} disabled={!signup.isValid}>Sign up</Button>
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
