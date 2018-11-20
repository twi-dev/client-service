import loadable from "core/hoc/loadable/page"

const Login = loadable({
  page: () => import("./Login"),

  state: () => import("./state")
})

export default Login
