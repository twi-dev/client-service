/**
 * A tiny static web server allows to test Twi's client application
 * on your local machine manually. **Do not use it in production!**
 */
const {join} = require("path")
const {createReadStream} = require("fs")

const Koa = require("koa")
const serve = require("koa-static")

const getConfig = require("../build/helper/getConfig")

const filename = join(__dirname, "..", "static", "index.html")
const config = getConfig({name: process.env.NODE_ENV || "development"})

const koa = new Koa()

function log(ctx, next) {
  console.log(ctx.path)

  return next()
}

const serveApplication = (ctx, next) => {
  if (ctx.method !== "GET") {
    return next()
  }

  ctx.type = "text/html"
  ctx.body = createReadStream(filename)
}

const onListen = () => (
  console.log("Listening on http://localhost:%s", config.client.port)
)

const onError = err => console.error(err)

koa
  .use(log)
  .use(serve(join(__dirname, "..", "static")))
  .use(serveApplication)
  .on("error", onError)
  .listen(config.client.port, onListen)
