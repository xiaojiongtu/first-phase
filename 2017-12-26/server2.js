const http=require('http');
const url=require('url');
const fs=require('fs');
const router=require('./libs/router');
const zlib=require('zlib');
const users=require('./routers/user');

let server=http.createServer((req,res)=>{
	let {pathname,query}=url.parse(req.url);
	  req.query=query;
	  res.send=function (data) {
          // JSON.stringify()【从一个对象中解析出字符串】
       if(!(data instanceof Buffer)&&typeof data!='string'){
       	    data=JSON.stringify(data);
	   }
          res.write(data);
	  };
	//1.判断是否是接口
	 if(false==router.emit(pathname,req,res)){   //不是接口，就读取文件
	 	//读取文件
	 	  let rs=fs.createReadStream();
	 	  let gz=zlib.createGzip();
		 res.setHeader('Content-Encoding','gzip');
		 rs.pipe(gz).pipe(res);
	 	  //如果读取失败
		 rs.on('error',err=>{
		 	res.writeHeader(404);
		 	res.write('not found');
		 	res.end();
		 })
	 }else {                                       //是个接口

	 }

	//2.读取文件

	//3.读取失败

}).listen(8080);
