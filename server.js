const path = require('path')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 5000 

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
  
})

io.on('connection', (socket) => {
  socket.on('message', msg => {
    io.emit('message', msg)
  })
  socket.on('config', msg => {
    console.log(msg)
    io.emit('config', msg)
  })
})

server.listen(port, () => {
  console.log(`Listening on ${port}`)
})