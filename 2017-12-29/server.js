const express=require('express');


let server=express();
server.listen(8080);


//接口
server.get('/',(req,res)=>{
	console.log('get请求')
});

server.post('/',(req,res)=>{
	console.log("post请求")
});


//静态文件
