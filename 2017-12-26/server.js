const http=require('http');
const url=require('url');
const fs=require('fs');
const zlib=require('zlib');

 let server =http.createServer((req,res)=>{
 	let {pathname,query}=url.parse(req.url,true);
 	let rs=fs.createReadStream(`www/${pathname}`);
 	let gz=zlib.createGzip();

 	res.setHeader('Content-Encoding','gzip');
   rs.pipe(gz).pipe(res);
   rs.on('error',err=>{
   	   res.writeHeader(404);
   	   res.write('not found');
   	   res.end()
   })
 }).listen(8080);
