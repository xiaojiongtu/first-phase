const express=require('express');

let server=express();
server.listen(8080);

server.get('/1.txt',(req,res,next)=>{
	 if(req.query['pass']=='123'){
       	res.sendFile('./www/1.txt');//要用绝对路径
       	res.end();
	   }else{
       	 res.sendStatus(403);
       	 res.end();
	   }
 });
