const koa=require('koa');
const router=require('koa-router');
const static=require('koa-static');

let server=new koa();

server.listen(8080);

//1.接口
let r1=router();
 r1.get('/reg/:id',async (ctx,next)=>{
 	console.log(ctx.params);
 	ctx.response.body='hshsh'
 });

server.use(r1.routes());
//2.静态文件
server.use(static('www'));
