const getName = ({name, displayName, constructor} = {}) => (
  displayName || name || constructor?.name || "Unknown"
)

export default getName
