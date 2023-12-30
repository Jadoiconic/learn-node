const http = require("http")
const server = http.createServer();

server.on('request', (req,res)=>{
    console.log("Request is running"),
    res.end("returned message!")
})

server.listen(5000,'localhost',()=>{
    console.log("Server running on http://localhost:5000")
})