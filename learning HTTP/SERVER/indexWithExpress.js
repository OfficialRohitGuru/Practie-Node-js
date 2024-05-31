const http = require("http")
const express = require("express")
const app = express();

app.get('/',(req,res)=>{
    return res.send('Hello from Home Page');
})

app.get('/about',(req,res)=>{
    return res.send('Hello from About Page' + " Hey " + req.query.name + ' you are ' + req.query.age);
})

// app.post()

const myServer = http.createServer(app);

myServer.listen(8000,()=> console.log("Server Started!"))

