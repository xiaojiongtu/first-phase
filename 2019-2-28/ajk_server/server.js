const koa=require('koa');
const db=require('./libs/mysql');
const router=require('koa-router');
const url=require('url')

let server=new koa();
server.listen(8080);

//跨域
server.use(async (ctx,next)=>{
	if(ctx.request.headers['origin']&&url.parse(ctx.request.headers['origin']).hostname==='localhost'){
      ctx.set('Access-Control-Allow-Origin','*')
	}
	await next()
})

let r1=new router();
server.use(r1.routes());
//接口
//1.列表:/api/house/page/:page
  r1.get('/api/house/page/:page',async (ctx)=>{
  	  let {page}=ctx.params;
  	  page=parseInt(page);
  	  if(isNaN(page)||page<1){
  	  	page=1;
	  }
	  let  page_size=8;
  	  let start=(page-1)*page_size;

       let data=await db.query(`SELECT * FROM house_table LIMIT ${start},${page_size}`)  //返回的data是数组
	  if(data.length===0){
	  	ctx.response.body={err:true,data:[]}
	  }else {
	  	ctx.response.body={err:false,data}
	  }
  });
//2.详情：/api/house/:id

r1.get('/api/house/:id',async ctx=>{
	let {id}=ctx.params;
	let data= await db.query(`SELECT * FROM house_table WHERE ID='${id}'`);

	if(data.length===0){
		ctx.response.body={err:true,data:null}
	}else {
		ctx.response.body={err:false,data:data[0]}
	}

});







