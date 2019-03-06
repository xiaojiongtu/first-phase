const koa=require('koa');
const route=require('koa-route');
const static=require('koa-static');
let server=new koa();

  server.listen(8080);


//1.接口

//2.静态文件
server.use(static('www'));
