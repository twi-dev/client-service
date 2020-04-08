import {basename, join} from "path"

import isPlainObject from "lodash/isPlainObject"
import partial from "lodash/partialRight"
import isEmpty from "lodash/isEmpty"
import find from "lodash/find"

import config from "lib/config"
import resolve from "lib/helper/util/requireDefault"
import iterator from "lib/helper/iterator/objectIterator"

const ctx = require.context("../../../route", false, /\.mjs$/)
const home = config.router?.home ?? "home"
const files = ctx.keys()
const ext = ".mjs"

const readFile = filename => {
  const content = ctx(filename) |> resolve

  if (isEmpty(content)) {
    return []
  }

  return content
}

const addPrefixes = (routes, filename) => routes.map(({path, ...route}) => ({
  ...route, path: join("/", basename(filename, ext), path)
}))

const getMain = routes => routes.concat(
  ...files
    .filter(filename => basename(filename, ext) !== home)
    .map(filename => filename |> readFile |> partial(addPrefixes, filename))
)

const getHome = routes => routes.concat(
  ...files.filter(filename => basename(filename, ext) === home).map(readFile)
)

function getRewrites(routes) {
  const rewrites = []

  for (const [path, rewrite] of iterator(config.router.rewrites).entries()) {
    const route = find(routes, {path})

    if (isPlainObject(route)) {
      rewrites.push({...route, path: rewrite})
    }
  }

  return routes.concat(...rewrites)
}

const getRoutes = () => (
  Array.from(new Set([] |> getMain |> getHome |> getRewrites))
    .filter(route => isEmpty(route) === false)
    .map(route => "exact" in route ? route : ({...route, exact: true}))
)

export default getRoutes
