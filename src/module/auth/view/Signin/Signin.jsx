import {h} from "preact"

import User from "common/model/user/User"

import Form from "module/auth/common/component/Form"

const Signin = () => (
  <Form title="Signin" buttonText="Sign in">
    <input type="text" placeholder="Email or login..." />
    <input type="password" placeholder="Password..." />
  </Form>
)

Signin.getInitialProps = async () => ({
  user: User.create({
    id: "123",
    login: "OctetStream",
    role: "ROOT",
    status: "ACTIVE",
    dates: {
      registeredAt: new Date()
    }
  })
})

export default Signin
