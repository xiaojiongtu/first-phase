const koa=require('koa');
const route=require('koa-route');
const static=require('koa-static');

let server=new koa();

server.listen(8080);

//1.接口
server.use(route.get('/reg',async function(ctx,next) {
	ctx.response.body='abc';
	console.log(1)
	await next()
	console.log(ctx.request.query);
}));
server.use(route.get('/reg',async function(ctx,name,pass,next) {
	ctx.response.body='问问';
	console.log(2);
}));
//2.静态文件
server.use(static('www'));
