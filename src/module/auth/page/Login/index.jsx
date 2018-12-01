import loadable from "core/hoc/loadable/page"

const page = () => import("./Login")

const state = () => import("./state")

const Login = loadable({state, page, name: "Login"})

export default Login
