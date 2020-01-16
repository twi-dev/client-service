import {observer, useLocalStore} from "mobx-react-lite"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Form from "common/component/Form"
import Input from "common/component/Input"
import Button from "common/component/Button/Primary"

import Model from "common/model/Auth/LogIn"

import {container, box, field, actions} from "./login.css"

function Login() {
  useTitle("Login")

  const {
    username,
    updateUsername,
    password,
    updatePassword,
  } = useLocalStore(() => Model.create())

  return (
    <div className={container}>
      <Form className={box}>
        <div className={field}>
          <Input
            required
            type="email"
            name="username"
            placeholder="Email or login"
            value={username}
            onChange={updateUsername}
          />
        </div>

        <div className={field}>
          <Input
            required
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
      </Form>
    </div>
  )
}

export default Login |> observer
