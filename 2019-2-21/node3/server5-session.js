const koa=require('koa');
const session=require('koa-session');

let server=new koa();

server.listen(8080);

server.keys=[
	'sdsdsd','dsdsd'
]
server.use(session({maxAge:1000},server))
server.use(async (ctx,next)=>{
	if(!ctx.session['n']){
		ctx.session['n']=1;
	}else {
		ctx.session['n']++
	}
	ctx.response.body=`你是第${ctx.session['n']}次来访`;

	console.log(`${ctx.session['n']}`)
});
