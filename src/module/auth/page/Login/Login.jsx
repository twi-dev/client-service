import React, {Component, Fragment} from "react"
import {shape, func, string} from "prop-types"

import connect from "core/model/connect"
import Title from "common/component/Title"

import Form from "module/auth/common/component/Form"
import Input from "module/auth/common/component/Form/Input"
import Link from "module/auth/common/component/Form/Link"
import Fields from "module/auth/common/component/Form/Fields"
import Button from "module/auth/common/component/Form/Button"
import Footer from "module/auth/common/component/Form/Footer"
import withRedirect from "module/auth/common/hoc/withRedirect"

import {container, recover} from "./login.scss"

const mapStoresToProps = ({login}) => ({login})

@withRedirect
@connect(mapStoresToProps)
class Login extends Component {
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

  submit = () => {
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
        <Form className={container} onSubmit={this.submit}>
          <Fields>
            <Input
              type="text"
              name="username"
              placeholder="Login..."
              autoComplete="username"
              value={username}
              onChange={login.updateTextField}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password..."
              autoComplete="off"
              value={password}
              onChange={login.updateTextField}
            />

            <Button type="submit" disabled={!login.isValid}>
              Log in
            </Button>
          </Fields>

          <Footer>
            <Link to="/auth/signup">
              Have no account yet?
            </Link>
            <Link to="/auth/recover" className={recover}>
              Forgot your password?
            </Link>
          </Footer>
        </Form>
      </Fragment>
    )
  }
}

export default Login
