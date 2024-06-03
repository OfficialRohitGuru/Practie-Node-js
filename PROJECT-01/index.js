const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    fs.appendFile(
        "log.txt",`\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
        (err, data) => {
            next();
        }
    )
})
app.use((req,res,next)=>{
    console.log('Hello from middleware 1');
    // return res.json({msg: "Hello from middleware 1"});
    next();
})
app.use((req,res,next)=>{
    console.log('Hello from middleware 1');
    // return res.json({msg: "Hello from middleware 1"});
//    res.end('ending')
   next();
})
//Routes

app.get('/users', (req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
    </ul>`;
    res.send(html)
})

// RestAPI

app.get('/api/users',(req,res)=>{
    res.setHeader("x-myName", "Rohit Guru");
    return res.json(users);
})

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if(!user) return res.status(404).json({error:"user not found"})
    return res.json(user);
}).patch((req,res)=>{
    // TODO: Edit the user with id
    return res.json({status:"pending"})
}).delete((req,res)=>{
    // TODO:Delete the user with id
    return res.json({status:"pending"})
});

// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// })

app.post('/api/users', (req,res) => {
    // TODO: Create new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        res.setHeader("x-newData", "notCreated");
        return res.status(400).json({status:"Send all the data"})
    }
    users.push({...body, id:users.length+1});
    res.setHeader("x-newData", "Created");
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
       return res.status(201).json({status: "success", id: users.length}); 
    })
});
// app.patch('api/users/:id', (req,res)=>{
//     // TODO: Edit the user with id
//     return res.json({status:"pending"})
// })
// app.delete('api/users/:id', (req,res)=>{
//     // TODO:Delete the user with id
//     return res.json({status:"pending"})
// })

app.listen(PORT,()=>console.log(`Server Start at Port ${PORT}`))