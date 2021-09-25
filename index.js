const port = "8080"
const Corrosion = require('corrosion')
const express = require('express')
const app = express()

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
    title: "Rusty",
})

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
});

app.use('/', function (req, res) {
    proxy.request(req,res)
});

app.listen(process.env.PORT || port, () => {
  console.log(`Rusty is running at localhost:${port}`)
})