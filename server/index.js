const {join} = require("path")
const {createReadStream} = require("fs")

const Koa = require("koa")
const serve = require("koa-static")

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
  ctx.body = createReadStream(
    join(__dirname, "..", "static", "view", "container.html")
  )
}

const onListen = () => console.log("Listening on http://localhost:3034")

const onError = err => console.error(err)

koa
  .use(log)
  .use(serve(join(__dirname, "..", "static")))
  .use(serveApplication)
  .on("error", onError)
  .listen(3034, onListen)
