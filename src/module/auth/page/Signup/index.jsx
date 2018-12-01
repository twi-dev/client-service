import loadable from "core/hoc/loadable/page"

const state = () => import("./state")

const page = () => import("./Signup")

const Signup = loadable({state, page, name: "Signup"})

export default Signup
