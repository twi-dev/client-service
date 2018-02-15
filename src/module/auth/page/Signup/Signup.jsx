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

import Model from "./SignupModel"

import {container, field, button, linkLogin, linkRecover} from "./signup.sss"

// const Login = ({auth}) => (
//   <Fragment>
//     <Title title="Signup" />
//     <Form class={container}>
//       <Fields>
//         <Input
//           type="text"
//           name="login"
//           placeholder="Login..."
//           autocomplete="off"
//           class={field}
//           value={auth.login}
//           onInput={auth.updateLogin}
//         />
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email..."
//           autocomplete="off"
//           class={field}
//           value={auth.email}
//           onInput={auth.updateEmail}
//         />
//         <Input
//           type="password"
//           name="password"
//           placeholder="Password..."
//           autocomplete="off"
//           class={field}
//           value={auth.password}
//           onInput={auth.updatePassword}
//         />
//         <Button class={button}>Log in</Button>
//       </Fields>
//       <Footer>
//         <Link class={linkLogin} href to="/auth/login">
//           Already have an account?
//         </Link>
//         <Link class={linkRecover} href to="/auth/recover">
//           Forgot your password?
//         </Link>
//       </Footer>
//     </Form>
//   </Fragment>
// )

// Login.propTypes = {
//   auth: shape({
//     login: string,
//     password: string,
//     updateLogin: func.isRequired,
//     updateEmail: func.isRequired,
//     updatePassword: func.isRequired,
//   }).isRequired
// }

// Login.getInitialProps = async () => ({
//   auth: Model.create({})
// })

class Login extends Component {
  static getInitialProps = async () => ({
    auth: Model.create({})
  })

  static propTypes = {
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

  __login = () => {
    this.props.auth.signup()
      .then(() => this.props.history.push("/"))
      .catch(console.error)
  }

  render() {
    const {auth} = this.props

    return (
      <Fragment>
        <Title title="Signup" />
        <Form class={container} onSubmit={this.__login}>
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
            <Link class={linkLogin} href to="/auth/login">
              Already have an account?
            </Link>
            <Link class={linkRecover} href to="/auth/recover">
              Forgot your password?
            </Link>
          </Footer>
        </Form>
      </Fragment>
    )
  }
}

export default Login
