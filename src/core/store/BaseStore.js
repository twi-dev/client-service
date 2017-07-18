import {observable, computed} from "mobx"
import {get, set} from "object-path"

class BaseStore {
  @observable _data = {}

  @observable _localData = {}

  constructor(data) {
    this._data = {...data}
  }

  get $data() {
    return this._data
  }

  get $local() {
    return this._localData
  }

  setValue(path, value) {}

  setLocalValue(path, value) {}
}

export default BaseStore
