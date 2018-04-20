const beforeRender = async Component => {
  await new Promise(resolve => setTimeout(resolve, 1000))

  return Component
}

export default beforeRender
