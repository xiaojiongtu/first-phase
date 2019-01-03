const http=require('http');
const assert=require('assert');
const url=require('url');

module.exports=function () {
	let queue=[];
  	let server=http.createServer((req,res)=>{
  		let {pathname,query}=url.parse(req.url,true);
  		req.query=query;
  		req.send=function(any){
  			if(any instanceof Buffer||typeof any=='string'){
                req.write(any)
			}
		};
         _run(0);
  		function _run() {
			for (i=n;i<queue.length;i++){
				if(queue[i].pathname==pathname){
					queue[i].fn(req,res,()=>{
						_run(i+1);
					});
				}
			}
		}
	});
     server.get=function () {
     	assert(arguments.length==2||arguments.length==1||'参数有误');
     	let path,fn;
		 if (arguments.length==2){
              path=arguments[0];
              fn=arguments[1];
		 } else if(arguments.length==1){
            fn=arguments[0];
            path='*';
		 }
		 queue.push({path,fn})
	 };
  	return server;
};
