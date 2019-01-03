const express=require('express');

let server=express();
server.listen(8080);

 server.get('/a.txt',(req,res,next)=>{
       if(req.query['pass']=='123'){
       	res.sendFile('./www/1.txt');
       	res.end();
	   }else{
       	 res.sendStatus();
	   }
 });
