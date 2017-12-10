async function processResponse(resoponse) {
  if (resoponse.status >= 300) {
    throw new Error(`Network error: ${resoponse.status}`)
  }

  const body = await resoponse.json()

  return body
}

export default processResponse
