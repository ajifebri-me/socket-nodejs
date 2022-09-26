const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server,{})

io.on("connection", socket => {
    socket.on("join", param => {
        console.log("new user joined")
    })
    socket.on("message", param => {
        io.emit("message", param)
    })
})