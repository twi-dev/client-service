function getOperationName(ast) {
  const def = ast.definitions.find(({kind}) => kind === "OperationDefinition")

  return def?.name?.value ?? null
}

export default getOperationName
