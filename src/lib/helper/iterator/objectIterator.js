class ObjectIterator {
  constructor(iterable) {
    this.__iterable = iterable

    // I'm using this method because of fucking semicolon -_-
    Array.from([Symbol.iterator, "keys", "values", "entries"])
      .forEach(name => this[name] = this[name].bind(this))
  }

  keys() {
    if (!this.__iterable) {
      return []
    }

    return Object.keys(this.__iterable)
  }

  * values() {
    for (const [, value] of this.entries()) {
      yield value
    }
  }

  * entries() {
    for (const key of this.keys()) {
      const value = this.__iterable[key]

      yield [key, value]
    }
  }

  [Symbol.iterator]() {
    return this.values()
  }
}

const objectIterator = iterable => new ObjectIterator(iterable)

const entries = iterable => new ObjectIterator(iterable).entries()

const keys = iterable => new ObjectIterator(iterable).keys()

const values = iterable => new ObjectIterator(iterable).values()

objectIterator.entries = entries

export default objectIterator
export {ObjectIterator, entries, keys, values}
