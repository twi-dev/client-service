import {useContext} from "react"

import getName from "lib/helper/component/getName"

/**
 * Takes a store from a given Context.
 * Ensures the store is used within <Context.Provider>
 *
 * @param {React.Context} Context
 *
 * @return {object} MobX State Tree store
 */
function useStore(Context) {
  const store = useContext(Context)

  if (!store) {
    throw new Error(
      `useStore must be called within the <${getName(Context)}.Provider />`
    )
  }

  return store
}

export default useStore
