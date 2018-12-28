const dns=require('dns');

dns.lookup('www.baidu.com',(err,data)=>{
	 if(err){
	 	console.log('出错了')
	 }else{
		 console.log(data);
	 }
})
