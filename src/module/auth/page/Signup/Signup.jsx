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

import {container, field, button, linkLogin} from "./signup.scss"

const mapStoresToProps = ({signup}) => ({signup})

@withRedirect
@connect(mapStoresToProps)
class Login extends Component {
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

  submit = () => {
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
        <Form className={container} onSubmit={this.submit}>
          <Fields>
            <Input
              type="text"
              name="username"
              placeholder="Login..."
              autocomplete="off"
              className={field}
              value={username}
              onChange={signup.updateTextField}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email..."
              autocomplete="off"
              className={field}
              value={email}
              onChange={signup.updateTextField}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password..."
              autocomplete="off"
              className={field}
              value={password}
              onChange={signup.updateTextField}
            />
            <Button className={button} disabled={!signup.isValid}>
              Sign up
            </Button>
          </Fields>
          <Footer>
            <Link className={linkLogin} href to="/auth/login">
              Already have an account?
            </Link>
          </Footer>
        </Form>
      </Fragment>
    )
  }
}

export default Login
