import {useContext} from "react"

import getName from "lib/helper/component/getName"

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
