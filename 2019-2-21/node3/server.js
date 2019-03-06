const koa=require('koa');

let server=new koa();

server.listen(8080);

server.use(async (ctx,next)=>{
	let {user,pass}=ctx.request.query;
	console.log(user,pass)
});
