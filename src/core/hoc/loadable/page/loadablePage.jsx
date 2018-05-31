import merge from "core/helper/util/objectFlatMerge"

import Loading from "core/component/Loading"

import stateful from "../statefulComponent"
import loadingProcess from "../../loadingProcess"
import errorHandler from "../../errorHandler"

import matchErrors from "./matchErrors"

const loading = loadingProcess({
  onLoading: Loading,
  onError: errorHandler(matchErrors)
})

const loadablePage = options => stateful(merge({}, options, {loading}))

export default loadablePage
