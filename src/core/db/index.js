import {createInstance, INDEXEDDB} from "localforage"

const db = createInstance({
  name: "twi",
  driver: INDEXEDDB,
  storeName: "internals"
})

export default db
