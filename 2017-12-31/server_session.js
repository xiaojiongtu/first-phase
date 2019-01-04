const express=require('express');
const cookieSession=require('cookie-session');

let server=express();
server.listen(8080);

server.use(cookieSession({
	secret: 'sjdhjdhjsdhjs'
}));

server.get('/',(req,res)=>{
	  req.session['cash']=900;
	console.log(req.session);
	res.end();
});
