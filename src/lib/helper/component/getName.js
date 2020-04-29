/**
 * @param {React.Component & {name: string, displayName: string}} [component]
 *
 * @return {string}
 */
const getName = ({name, displayName, constructor} = {}) => (
  displayName || name || constructor?.name || "Unknown"
)

export default getName
