const express = require('express')
const res = require('express/lib/response')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const port = process.env.PORT || 5000 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('message', msg)
    console.log(msg)
  })
})

server.listen(3000, () => {
  console.log(`Listening on ${port}`)
})