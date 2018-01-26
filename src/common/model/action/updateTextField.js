function updateTextField(self) {
  const updateField = ({target: {name, value}}) => {
    if (name in self) {
      self[name] = String(value)
    }
  }

  return updateField
}

export default updateTextField
