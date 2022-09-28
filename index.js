const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http,{
    cors: {
        origin: '*'
    }
})

//start socket server
let connected;
io.on("connection",socket => {
    connected = socket
    socket.on("message", param => {
        io.emit("message", param)
    })
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// endpoint for emit message
app.post("/emit", function(request, response){
    try {
        connected.emit("message", request.body)
    
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