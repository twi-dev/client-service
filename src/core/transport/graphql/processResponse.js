async function processResponse(resoponse) {
  if (resoponse.status >= 300) {
    throw new Error(`Network error: ${resoponse.status}`)
  }

  return resoponse.json()
}

export default processResponse
