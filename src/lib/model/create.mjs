import merge from "lodash/merge"

/**
 * just executes a .create() method of given MST model,
 * because its looses a context when using as a function argument >_>
 *
 * Also it makes a force copy of given snapsoht to prevent
 * than freezing error from Apollo Client response -_-
 */
const create = model => snapshot => model.create(merge({}, snapshot))

export default create
