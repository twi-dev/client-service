import {createInstance, INDEXEDDB} from "localforage"

const defaults = {
  name: "twi",
  driver: INDEXEDDB
}

const createConnection = (storeName, options = {}) => createInstance({
  ...defaults, ...options, storeName
})

export default createConnection
