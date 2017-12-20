import {join, extname} from "path"

const ctx = require.context("../../", true, /route\//)

const routes = ctx.keys()
  .filter(path => extname(path) === ".json")
  .map(path => join(__dirname, "..", "..", path))

console.log(routes)
