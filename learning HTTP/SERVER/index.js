const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    if(req.url==="/favicon.ico") return res.end();
    const log = `${Date.now()}:${req.url} New Req Recieve\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':res.end("Home Page");
            break
            case '/about':
            const username = myUrl.query.myName
            res.end(`Hi ${username}`);
            break
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your result for" + search)
            default:res.end("404 not found")
        }
        
    })

    // console.log(req);
    
});

myServer.listen(8000, ()=> console.log("Server Started!"))

