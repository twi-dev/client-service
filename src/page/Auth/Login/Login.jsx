import {useHistory, Link} from "react-router-dom"
import {useForm} from "react-hook-form"
import {createElement} from "react"

import useTitle from "lib/hook/useTitle"

import Form from "common/component/Form"
import Input from "common/component/Input"
import Button from "common/component/Button/Primary"

import logIn from "common/graphql/mutation/auth/logIn"

import {container, box, fields, field, actions, links, link} from "./login.css"

function Login() {
  useTitle("Login")

  const history = useHistory()

  const {register, handleSubmit, errors, formState: state} = useForm({
    nativeValidation: true,
    mode: "onChange"
  })

  function submit(user) {
    logIn(user)
      .then(() => history.push("/"))
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
            <Button wide type="submit" disabled={!state.isValid}>
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
