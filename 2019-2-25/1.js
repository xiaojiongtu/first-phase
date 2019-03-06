const http=require('http');

let client=http.request({
	host:'www.baidu.com',
	port:80,
	pathname:'/s?ie=utf-8&tn=93041572_hao_pg&word=abc'

},res=>{

	 let str='';
	res.on('data',data=>{
		str+=data;
	});

	res.on('end',()=>{
		console.log(str);
	});

	res.on('error',err=>{
		console.log(err);
	})
});

client.end();
