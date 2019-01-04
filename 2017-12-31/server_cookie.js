const express=require('express');
const cookieParser=require('cookie-parser');

let server=express();
server.listen(8080);

server.use(cookieParser('sjdhjdhjsdhjs'));

server.get('/',(req,res)=>{
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.cookie('pass','1234',{maxAge:20000,signed:true});
	res.end();
});
