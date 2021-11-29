const port = "8080"
const Corrosion = require('./lib/server')
const express = require('express')
const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "Rusty",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "Page is blocked"),
    ]
})

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.use('/', function (req, res) {
  if (req.url.startsWith(proxy.prefix)) {
    proxy.request(req,res)
  } else {
    res.send("Cannot GET " + req.url)
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Rusty is running at localhost:${port}`)
})