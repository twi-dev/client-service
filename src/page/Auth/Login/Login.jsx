import {useForm} from "react-hook-form"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Link from "component/Link"
import Form from "component/Form"
import Input from "component/Input"
import Button from "component/Button/Primary"

import logIn from "api/mutation/auth/logIn"

import {container, box, fields, field, actions, links, link} from "./login.css"

function Login() {
  useTitle("Login")

  const {register, handleSubmit, errors} = useForm({
    nativeValidation: true,
    mode: "onBlur"
  })

  function submit(user) {
    logIn(user)
      .then(() => window.location.reload())
      .catch(console.error)
  }

  return (
    <div className={container}>
      <Form className={box} onSubmit={handleSubmit(submit)}>
        <div className={fields}>
          <div className={field}>
            <Input
              autoFocus
              id="username"
              type="text"
              name="username"
              placeholder="Email or login"
              invalid={"username" in errors}
              ref={register({required: true})}
            />
          </div>

          <div className={field}>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              invalid={"password" in errors}
              ref={register({required: true})}
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

export default Login
