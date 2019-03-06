const koa=require('koa');
const route=require('koa-route');
const static=require('koa-static');
const myStatic=require('./libs/my-static');

let server=new koa();

server.listen(8080);

//官方


server.use(myStatic('www'));
//2.静态文件
// server.use(static('www'));
