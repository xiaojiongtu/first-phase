const koa=require('koa');
const route=require('koa-route');
const static=require('koa-static');

let server=new koa();

server.listen(8080);

//官方

server.use(async (ctx,next)=>{
 let start=new Date().getTime();

 await next();

 console.log(`处理时间：${new Date().getTime()-start}ms`)
});

//1.接口
server.use(async (ctx,next)=>{
	try {
		await next()
	}catch (e) {
		ctx.response.body='404'
	}
});

//2.静态文件
server.use(static('www'));
