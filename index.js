const {Server} = require("socket.io")

const io = new Server({
    cors: {
        origin: '*'
    }
});

io.on("connection",socket => {
    socket.emit("connection", "hallo")
    socket.on("join", param => {
        console.log("new user joined")
    })
    socket.on("message", param => {
        console.log(param)
        io.emit("message", param)
    })
})

io.listen(3000)