const  express=require('express');
const bodyParser=require('body-parser');
const querystring=require('querystring');

let server=express();
server.listen(8080);

server.use((req,res,next)=>{
     //处理post数据
     let str='';
	req.on('data',data=>{
      str+=data;
	});
	req.on('end',()=>{
		let data=querystring.parse(str);
		req.body=data;
		next();
	})
});

server.post('/',(req,res)=>{
	console.log(req.body);
});
