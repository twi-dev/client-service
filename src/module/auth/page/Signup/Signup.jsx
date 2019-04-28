import {createElement, Component, Fragment} from "react"
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

const mapStoresToProps = ({signUp}) => ({signUp})

@withRedirect
@connect(mapStoresToProps)
class Login extends Component {
  static propTypes = {
    onError: func.isRequired,
    signUp: shape({
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
    this.props.signUp.submit()
      .then(() => this.props.history.push("/"))
      .catch(this.props.onError)
  }

  render() {
    const {signUp} = this.props
    const {username, email, password} = signUp

    return (
      <Fragment>
        <Title title="Signup" />

        <Form className={container} onSubmit={this.submit}>
          <Fields>
            <Input
              type="text"
              name="username"
              placeholder="Login..."
              autoComplete="off"
              className={field}
              value={username}
              onChange={signUp.updateUsername}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email..."
              autocomplete="off"
              className={field}
              value={email}
              onChange={signUp.updateEmail}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password..."
              autocomplete="off"
              className={field}
              value={password}
              onChange={signUp.updatePassword}
            />

            <Button className={button} disabled={!signUp.isValid}>
              Sign up
            </Button>
          </Fields>

          <Footer>
            <Link className={linkLogin} to="/auth/login">
              Already have an account?
            </Link>
          </Footer>

        </Form>
      </Fragment>
    )
  }
}

export default Login
