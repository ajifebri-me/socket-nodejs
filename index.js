const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http,{
    cors: {
        origin: '*'
    }
})

/**
 * Create Connection Socket Server
 */
let connectedSocket;
io.on("connection",socket => {
    connectedSocket = socket
    socket.on("message", param => {
        io.emit("message", param)
    })

    socket.on("private message", (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
})

/**
 * Middleware for accept request body
 */
app.use(express.json())
app.use(express.urlencoded({extended: false}))

/**
 * Endpoint for emit socket server
 */

//public channel
app.post("/emit", function(request, response){
    try {
        connectedSocket.emit("message", request.body)
    
        response.status(200).json({
            status: true,
            message: "send message successs",
        })
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "send message failed"
        })
    }
})

//private channel
app.post("/emit/privat-channel", function(request, response){
    try {
        connectedSocket.emit("private message", 2, "response 1")

        response.status(200).json({
            status: true,
            message: "send message successs",
        })
    } catch (error) {
        response.status(500).json({
            status: false,
            message: "send message failed"
        })
    }
})

http.listen(3000, function(){
    console.log("server connected on port 3000")
})