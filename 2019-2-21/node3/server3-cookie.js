const koa=require('koa');


let server=new koa();

server.listen(8080);

server.keys=[
	'sdsdsd','dsdsd'
]
server.use(async (ctx,next)=>{
	// ctx.cookies.set('user','blue',{maxAge:24*3600*1000,singed:true})
	console.log(ctx.cookies.get('user',{singed:true}))
});
