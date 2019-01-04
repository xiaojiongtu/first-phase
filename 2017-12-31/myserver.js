const express=require('./libs/myexpress');


let server=express();
server.listen(9090);
console.log('成功的监听了');

server.get('/',(req,res,next)=>{
	console.log('get');
	res.send("shds");
	next();
})

server.get('/',(req,res,next)=>{
	console.log('post');
	res.send('add');
	res.end();
})
