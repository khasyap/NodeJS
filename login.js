var http=require('http');
var user=require('./user');
 
var userList=user.get()
const login=http.createServer((req,res)=>{
    res.writeHead(200,'content-type','text/JSON');
if(req.url==='/login'&& req.method==='POST'){
    let login=""
    req.on('data',(chunk)=>{
        login+=chunk;
    });

}
else if(req.url==='/register' && req.method==='POST'){
    let reg=""
    req.on('dat',(chunk)=>{
        reg+=chunk;
    });
    req.on('end',()=>{
        userList.push(JSON.stringify(reg))
        res.end("registration successfully.")
    })
}
else if(req.url.startsWith('/users/') && req.method==='DELETE'){
    const id=req.url.split('/')[2];
    const index=userList.findIndex((i)=>i.username==username)
}
})