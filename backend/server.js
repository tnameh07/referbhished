const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const { v4: uuidV4 } = require('uuid')



// app.set('view engine', 'ejs')
// app.use(express.static('public'))
// app.use('/peerjs', peerServer)
app.get('/', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
  res.send({backend :"Server running"})
})

// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room })
// })

io.on('connection', socket => {

  console.log("server : IO connection created socket id :", socket.id);
  socket.on('join-room', (roomId, userId) => {
    console.log("Someone jooin the rrom  ID: ", roomId);
    socket.join(roomId)
    console.log( "Inside the room brodcasting  masage to client ", userId , "SocektID :", socket.id);
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      console.log("USer leave the meeting ");
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(8080 , ()=>{
  console.log("SErver runging on port 8080")
})