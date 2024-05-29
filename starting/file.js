const fs = require("fs");


// synchronus call
// fs.writeFileSync("./text.txt","Hello world")

// fs.writeFile("./test.txt", "Hello World Async", (err)=>{})

// const result = fs.readFileSync("./contacts.txt","utf8")

// console.log(result)

// fs.readFile("./contacts.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err)
//     }else{
//         console.log(result)
//     }
// })

fs.appendFileSync("./test.txt", `${new Date().getDate().toLocaleString()}\n`);