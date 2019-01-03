const fs=require('fs')
module.exports=function (req,res,next) {
	let arr=[];
	//客户端id
	// arr.push(req.connection);
	//时间

	let oDate=new Date();
    arr.push('['+oDate.toGMTString()+']');
	//方法
	arr.push(req.method);
	//地址
	arr.push(req.url);

	fs.appendFile('log/log.log',arr.join(' ')+'\n',(err)=>{
		if(err){
			throw  new Error('wrong',err);
		}
		next()
	})
};
