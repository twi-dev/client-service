import merge from "core/helper/util/objectFlatMerge"
import loadingProcess from "core/hoc/loadingProcess"
import stateful from "core/hoc/loadable/stateful"
import errorHandler from "core/hoc/errorHandler"
import Loading from "core/component/Loading"

import matchErrors from "./matchErrors"

const loading = loadingProcess({
  onLoading: Loading,
  onError: errorHandler(matchErrors)
})

const loadablePage = params => stateful(merge({}, params, {loading}))

export default loadablePage
