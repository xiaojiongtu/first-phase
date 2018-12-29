const express=require('express');


let server=express();
server.listen(8080);


//接口
server.get('/',(req,res,next)=>{
	res.send('aaa');
	next();
});

server.get('/',(req,res,next)=>{
	res.send("bbb")
});



