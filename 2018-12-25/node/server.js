const http=require('http');
const url=require('url');
const querystring=require('querystring');

let server=http.createServer((req,res)=>{
	  //接受get
     let {query,pathname}=url.parse(req.url,true);
	console.log(query,pathname);

	//post 请求,此data是二进制数据
	let aBuffer=[];
	req.on('data',data=>{
		 aBuffer.push(data);
	});

	req.on('end',()=>{
        let data=Buffer.concat(aBuffer);
        let post=querystring.parse(data.toString());
        console.log(post);
	})
}).listen(8080);
