const koa=require('koa');
const mysql=require('./libs/koa-better-mysql');
const ejs=require('koa-ejs');
const get=require('./libs/koa-http');

let db=mysql.createPool({host: 'localhost', user: 'root', password: '', port: 3306, database: 'anjuke'});


let server=new koa();
server.listen(8080);

ejs(server,{
	root:'./template',
	layout:false,
	viewExt:'ejs',
	cache:false,
	debug:true
});
server.use(async ctx=>{
	let buffer=await get('http://localhost/a.php?n1=444&n2=55');
	ctx.response.body=buffer.toString();
})
