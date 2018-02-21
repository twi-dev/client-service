import loadable from "react-loadable"

import Loading from "common/component/Loading/Page"

export default loadable({
  loader: () => import("./ApplicationError"),
  loading: Loading
})
