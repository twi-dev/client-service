import {observer, useLocalStore} from "mobx-react-lite"
import {useHistory, Link} from "react-router-dom"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Form from "common/component/Form"
import Input from "common/component/Input"
import Button from "common/component/Button/Primary"

import Model from "common/model/Auth/LogIn"

import {container, box, fields, field, actions, links, link} from "./login.css"

function Login() {
  useTitle("Login")

  const history = useHistory()

  const {
    username,
    updateUsername,
    password,
    updatePassword,
    submit: logIn
  } = useLocalStore(() => Model.create())

  function submit() {
    logIn()
      .then(() => history.push("/"))
      .catch(console.error)
  }

  return (
    <div className={container}>
      <Form className={box} onSubmit={submit}>
        <div className={fields}>
          <div className={field}>
            <Input
              required
              id="username"
              type="text"
              name="username"
              placeholder="Email or login"
              value={username}
              onChange={updateUsername}
            />
          </div>

          <div className={field}>
            <Input
              required
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>

          <div className={actions}>
            <Button wide type="submit">
              Log in
            </Button>
          </div>
        </div>
        <div className={links}>
          <Link className={link} to="/auth/signup">
            Have no account yet?
          </Link>

          <Link className={link} to="/auth/recover">
            Forgot a password?
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default Login |> observer
