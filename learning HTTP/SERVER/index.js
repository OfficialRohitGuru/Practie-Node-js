const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url,true);
    // console.log(myUrl);
    if(req.url==="/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Recieve\n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':
                if(req.method==="GET") res.end("Home Page");
            break
            case '/about':
            const username = myUrl.query.myName
            res.end(`Hi ${username}`);
            break
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your result for" + search)
            case "/signup":
                if(req.method==="GET") res.end("This is a signup Form");
                else if(req.method === "POST"){
                    // DB QUERY
                    res.end("Success");
                }
            default:res.end("404 not found")
        }
        
    })

    // console.log(req);
    
});

myServer.listen(8000, ()=> console.log("Server Started!"))

