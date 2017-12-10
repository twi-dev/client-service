function* objectIterator(iterable, entries = false) {
  if (!iterable) {
    return
  }

  for (const key of Object.keys(iterable)) {
    const value = iterable[key]

    yield entries ? [key, value] : value
  }
}

objectIterator.entries = iterable => objectIterator(iterable, true)

export default objectIterator
