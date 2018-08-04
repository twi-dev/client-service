import React, {Component, Fragment} from "react"
import {shape, func, string} from "prop-types"

import Title from "common/component/Title"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Form/Input"
import Link from "module/auth/common/component/Form/Link"
import Fields from "module/auth/common/component/Form/Fields"
import Button from "module/auth/common/component/Form/Button"
import Footer from "module/auth/common/component/Form/Footer"
import withRedirect from "module/auth/common/hoc/withRedirect"

import {container} from "./login.scss"

@withRedirect class Login extends Component {
  static propTypes = {
    onError: func.isRequired,
    login: shape({
      login: string,
      password: string,
    }).isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired
  }

  __login = () => {
    this.props.login.authenticate()
      .then(() => this.props.history.push("/"))
      .catch(this.props.onError)
  }

  render() {
    const {login} = this.props
    const {username, password} = login

    return (
      <Fragment>
        <Title title="Login" />
        <Form class={container} onSubmit={this.__login}>
          <Fields>
            <Input
              type="text"
              name="username"
              placeholder="Login..."
              autocomplete="username"
              value={username}
              onInput={login.updateTextField}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password..."
              autocomplete="off"
              value={password}
              onInput={login.updateTextField}
            />
            <Button disabled={!login.isValid}>Log in</Button>
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
