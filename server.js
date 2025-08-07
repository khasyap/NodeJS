var http=require('http');
var products=require('./product');
var productList=products.get()
const server=http.createServer((req,res)=>{
    res.writeHead(200,'content-type','text/JSON');
    if(req.url=="/home" && req.method=="GET"){
        res.end("hello world welcome HOME");
    }
    else if(req.url=="/products" && req.method=="GET"){
        res.end(JSON.stringify(productList))
    }
    else if(req.url=="/addproduct" && req.method=="POST"){
        let newproducts="";
        req.on('data',(chunk)=>{
            newproducts+=chunk;
        })
        req.on('end',()=>{
            productList.push(JSON.parse(newproducts));
            res.end("product added successfully.")
        })
        
    }
    else if(req.url.startsWith("/products/")&& req.method=="DELETE"){
        const id=req.url.split('/')[2];
        const index=productList.findIndex(e=>e.productId==id);
        if(index!=-1){
            productList.splice(index,1)
            res.end("element deleted")
        }
        else{
            res.end("prodeuct not found")
        }
    }
    else if(req.url.startsWith("/products/")&& req.method=="PUT"){
        const id=req.url.split('/')[2];
         const index=productList.findIndex(e=>e.productId==id);
        if(index!=-1){
           let newproducts="";
        req.on('data',(chunk)=>{
            newproducts+=chunk;
        })
        req.on('end',()=>{
            productList.splice(index,1,JSON.parse(newproducts))  
            res.end("element updated")
        })
          
          
        }
    }
    else if(req.url.startsWith("/products/")&& req.method=="GET"){
        const price=parseInt(req.url.split('/')[2]);
        res.end(JSON.stringify(productList.filter((i)=>i.productPrice>price)))
    }
    
})
var port=4300;
server.listen(port,()=>{
    console.log(`server runing on http://localhost:${port}`);
})