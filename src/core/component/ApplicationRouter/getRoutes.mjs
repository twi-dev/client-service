import {basename, join} from "path"

import isPlainObject from "lodash/isPlainObject"
import isEmpty from "lodash/isEmpty"
import merge from "lodash/merge"
import find from "lodash/find"

import config from "config"
import resolve from "core/helper/util/requireDefault"
import iterator from "core/helper/iterator/objectIterator"

const assign = Object.assign
const router = config.router || {}

class Router {
  constructor() {
    this.__ctx = require.context("../../../route", true, /\.json$/)
    this.__config = merge({}, router, {home: "home"})

    this.__rewrites = []
    this.__routes = []
    this.__home = []
  }

  __readConfig = filename => {
    const conf = this.__ctx(filename)

    return isPlainObject(conf) ? [conf] : conf
  }

  __setRoute = (route, prefix) => {
    if (!isPlainObject(route)) {
      throw new TypeError("Ruote config must be an object.")
    }

    let path = route.path
    if (prefix !== this.__config.home) {
      path = join("/", prefix, path.replace(/^\//, ""))
    }

    const component = resolve(require(`module/${prefix}/${route.component}`))

    return assign({}, route, {prefix, path, component})
  }

  __combineRoutes = (routes, filename) => {
    const prefix = basename(filename, ".json")

    const conf = this.__readConfig(filename)

    for (const route of conf) {
      routes.push(this.__setRoute(route, prefix))
    }

    return routes
  }

  __getHomeRoutes = () => {
    let home = this.__ctx.keys()
      .find(filename => basename(filename, ".json") === this.__config.home)

    home = this.__ctx(home)

    return this.__home = (isPlainObject(home) ? [home] : home)
      .map(route => this.__setRoute(route, this.__config.home))
  }

  __getRoutes = () => {
    const configs = this.__ctx.keys()

    return this.__routes = configs
      .filter(filename => basename(filename, ".json") !== this.__config.home)
      .reduce(this.__combineRoutes, [])
  }

  __getRewrites = () => {
    for (const [path, rewrite] of iterator(this.__config.rewrites).entries()) {
      const route = find(this.__routes, {path})

      if (isPlainObject(route)) {
        this.__rewrites.push(assign({}, route, {path: rewrite}))
      }
    }

    return this.__rewrites
  }

  getRoutes = () => {
    const routes = this.__getRoutes()
    const rewrites = this.__getRewrites()
    const home = this.__getHomeRoutes()

    return Array.from(new Set([...routes, ...home, ...rewrites]))
      .filter(route => isEmpty(route) === false)
      .map(route => assign({}, route, {exact: true}))
  }
}

const getRoutes = () => new Router().getRoutes()

export default getRoutes
