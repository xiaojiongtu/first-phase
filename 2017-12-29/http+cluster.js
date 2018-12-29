const cluster=require('cluster');
const os=require('os');
const http=require('http');
const url=require('url');
const fs=require('fs');
const process=require('process');

if(cluster.isMaster){  //主进程，负责创建子进程
	for(i=0;i<os.cpus().length;i++){
		cluster.fork();
	}
}else {     //子进程，进程占满才会使用下一个进程
	 let server=http.createServer((req,res)=>{
	 	 let {pathname,query}=url.parse(req.url,true);
	 	 let rs= fs.createReadStream(`www${pathname}`);
	 	 rs.pipe(res);
         console.log(`${process.pid}`+"处理");
	 	  rs.on('error',err=>{
	 	  	res.writeHeader(404);
	 	  	res.write('not found');
	 	  	res.end();
		  })
	 }).listen(8080);
}
