const koa=require('koa');
const router=require('koa-router');
const static=require('koa-static');

let server=new koa();

server.listen(8080);

//1.接口
let mainRouter=router();
server.use(mainRouter.routes());

mainRouter.use('/user',require('./routers/user'));
//2.静态文件
server.use(static('www'));
