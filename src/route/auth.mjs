import Signup from "module/auth/page/Signup"
import Login from "module/auth/page/Login"
// import Recover from "module/auth/page/Recover"
// import Confirm from "module/auth/page/Recover/Confirm"

const auth = [
  {
    path: "/signup",
    page: {
      component: Signup,
      layout: false
    },
  },
  {
    path: "/login",
    page: {
      component: Login,
      layout: false
    },
  },
  // {
  //   path: "/recover",
  //   page: Recover,
  // },
  // {
  //   path: "/recover/confirm/:code",
  //   page: Confirm,
  // }
]

export default auth
