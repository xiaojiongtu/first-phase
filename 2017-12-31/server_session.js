const express=require('express');
const cookieSession=require('cookie-session');

let server=express();
server.listen(8080);

server.use(cookieSession({
	secret: 'sjdhjdhjsdhjs'
}));

server.get('/',(req,res)=>{
	  // req.session['cash']=900;   //设置session
	if(req.session['count']){
		req.session['count']++;
	}else{
		req.session['count']=1
	}
	console.log(req.session);
	res.send(`欢迎你第${req.session['count']}访问本站`);
	res.end();
});
